<script>
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components';
	import toast from 'svelte-french-toast';
	import PocketBase from 'pocketbase';
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import { loginUserSchema } from '$lib/schemas';
	import { z } from 'zod';
	
	export let form;

	let loading = false;

	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);


	// LEGACY login
	const submitLogin = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'fail':
					toast.error('Invalid credentials');
					await update();
					break;
				case 'error':
					toast.error(result.error.message);
					break;
				default:
					await update();
			}
			loading = false;
		};
	};

    async function login_yandex(form) {
		loading = true;
        try {
			// for safari popup problem https://github.com/pocketbase/pocketbase/discussions/2429#discussioncomment-5943061
			let w = window.open()

			// Set avatar
			const avatarFile = await fetch(`/images/random_avatars`).then(r => r.blob());

			await pb
				.collection("users")
				.authWithOAuth2({
				provider: 'yandex',
				createData: {
                    name: 'anonymous-' + Math.random().toString(36).substring(7),
					avatar: avatarFile,
                },
				urlCallback: (url) => {
					w.location.href = url
				},
				})

            form.token.value = pb.authStore.token;
            form.submit();
        } catch (err) {
            console.error(err);
			toast.error(err.message);
        }
		loading = false;
    }


    async function login_email_pass(form) {
		loading = true;
		
        try {
			// Validate form data using zod schema
			const formData = loginUserSchema.parse({
				email: form.email.value,
				password: form.password.value
			});

            const authData = await pb.collection('users').authWithPassword(
				formData.email,
				formData.password
			);

			if (!pb.authStore.model.verified) {
				throw new Error('Unverified email');
			}

            form.token.value = pb.authStore.token;
            form.submit();

			toast.success('Successful login!');
        } catch (err) {
			// Check if error is a ZodError (validation error)
			if (err instanceof z.ZodError) {
				// Extract error messages and display toast
				const errorMessages = err.errors.map(error => error.message).join(', ');
				toast.error(errorMessages);
			} else {
				// Handle other errors (e.g., authentication errors)
				if (err.message === 'Unverified email') {
					toast.error('Please verify your email before logging in.');
				} else {
					const message = err.message ? err.message : 'An error occurred during login.';
					toast.error(message);
				}

			}
        }
		loading = false;
    }

</script>

<div class="flex flex-col items-center h-full w-full max-w-lg mx-auto px-4 mb-20 mt-3">
	<div class="mt-8 text-center text-3xl font-bold tracking-tight text-base-content">
		Вход
	</div>
	<form
		method="post"
		action="?/oauth_yandex"
		on:submit|preventDefault={(e) => login_yandex(e.currentTarget)}
		disabled={loading}
		class="w-full"
	>
		<input name="token" type="hidden" />
		<button
			class="flex items-center place-content-center gap-2 w-full border rounded-full p-3 mt-10 text-base font-medium text-black stroke-neutral/10 hover:bg-gray-100"
			disabled={loading}
		>
			<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M2.04 12c0-5.523 4.476-10 10-10 5.522 0 10 4.477 10 10s-4.478 10-10 10c-5.524 0-10-4.477-10-10z" fill="#FC3F1D"/>
				<path d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z" fill="#fff"/>
			</svg>
			через Яндекс
		</button>
	</form>
	<div class="flex flex-col w-full mt-2 border-opacity-50 text-neutral/50">
		<div class="divider">или через почту</div>
	</div>
	<form
		action="?/login_pass"
		method="POST"
		class="flex flex-col items-center space-y-2 w-full pt-1"
		on:submit|preventDefault={(e) => login_email_pass(e.currentTarget)}
	>
		<input name="token" type="hidden" />
		<Input
			type="email"
			id="email"
			label="Почта"
			value={form?.data?.email ?? ''}
			errors={form?.errors?.email}
			disabled={loading}
		/>
		<Input
			type="password"
			id="password"
			label="Пароль"
			errors={form?.errors?.password}
			disabled={loading}
			context="login"
		/>



		<div class="w-full max-w-lg pt-7">
			<button type="submit" class="btn btn-primary rounded w-full" disabled={loading}>
				Войти
			</button>
		</div>
		<!-- {#if form?.notVerified}
			<div class="alert alert-error shadow-lg w-full max-w-lg">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>You must verify your email before you can login.</span>
				</div>
			</div>
		{/if} -->
	</form>
	<div class="text-center mt-6 text-gray-700">
		Нет аккаунта? <a
			href="/register"
			class="underline text-primary font-medium hover:cursor-pointer hover:underline">Зарегистрируйте</a>
	</div>
</div>

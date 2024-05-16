<script>
	import { Input } from '$lib/components';
	import PocketBase from 'pocketbase';
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import toast from 'svelte-french-toast';
	import { registerUserSchema } from '$lib/schemas';
	import { z } from 'zod';
	import bowser from 'bowser';

	let isSafari = false;

	$: {
		isSafari = true;
	}

	export let form;

	let loading = false;

	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

    async function login_yandex(form) {
		loading = true;
        try {
			if (isSafari) {
				// for safari popup problem https://github.com/pocketbase/pocketbase/discussions/2429#discussioncomment-5943061
				let w = window.open()	

				await pb
					.collection("users")
					.authWithOAuth2({
					provider: 'yandex',
					createData: {
						name: 'anonymous-' + Math.random().toString(36).substring(7),
					},
					urlCallback: (url) => {
						w.location.href = url
					},
					})
			} else {
				await pb
					.collection("users")
					.authWithOAuth2({
					provider: 'yandex',
					createData: {
						name: 'anonymous-' + Math.random().toString(36).substring(7),
					}
					})
			}

			// Set avatar
			//if (!pb.authStore.model.avatar) {
			if (false) {
				const now = new Date();
				const created = new Date(pb.authStore.model.created);
				// Calculate the difference in milliseconds
				const diffInMillis = now.getTime() - created.getTime();
				// Check if the account was created less than a minute ago (60,000 milliseconds)
				if (diffInMillis < 60000) {
					console.log('set avatar');
					const avatarFile = await fetch(`/images/random_avatars`).then(r => r.blob());
					const formDataNew = new FormData();
					formDataNew.append('avatar', avatarFile);

					// ALFA BADGE
					formDataNew.append('badges', 'bcmmsrxje5fsrax'); // has to be same at dev and prod

					await pb.collection("users").update(pb.authStore.model.id, formDataNew);
				}
			}

            form.token.value = pb.authStore.token;
            form.submit();
        } catch (err) {
            console.error(err);
			toast.error(err.message);
        }
		loading = false;
    }

	async function register_email_pass(form) {
		loading = true;
		
        try {
			// Validate form data using zod schema
			const formData = registerUserSchema.parse({
				email: form.email.value,
				password: form.password.value,
				passwordConfirm: form.passwordConfirm.value
			});

			const regData = {
				email: formData.email,
				password: formData.password,
				passwordConfirm: formData.passwordConfirm,
				name: 'noname-' + Math.random().toString(36).substring(7),
			}

			
			const formDataNew = new FormData();
			formDataNew.append('email', regData.email);
			formDataNew.append('password', regData.password);
			formDataNew.append('passwordConfirm', regData.passwordConfirm);
			formDataNew.append('name', regData.name);

			// Set avatar
			//const avatarFile = await fetch(`/images/random_avatars`).then(r => r.blob());
			//formDataNew.append('avatar', avatarFile);

			// ALFA BADGE
			formDataNew.append('badges', 'bcmmsrxje5fsrax'); // has to be same at dev and prod

			const authData = await pb.collection('users').create(formDataNew);
			await pb.collection('users').requestVerification(formData.email);

			toast.success('Now check your email to verify your account.');

			await new Promise(resolve => setTimeout(resolve, 5000));

            form.token.value = pb.authStore.token;
            form.submit();
        } catch (err) {
			// Check if error is a ZodError (validation error)
			if (err instanceof z.ZodError) {
				// Extract error messages and display toast
				const errorMessages = err.errors.map(error => error.message).join(', ');
				toast.error(errorMessages);
			} else {
				// Handle other errors (e.g., authentication errors)
				
				const message = err.message ? err.message : 'An error occurred during registration.';
				toast.error(message);
			}
		} 
		loading = false;
    }
</script>

<div class="flex flex-col items-center h-full w-full max-w-lg mx-auto px-4 mb-20 mt-3">
	<div class="mt-3 text-center text-3xl font-bold tracking-tight text-base-content">
		Регистрация
	</div>
	<form method="post" action="?/oauth_yandex" on:submit|preventDefault={(e) => login_yandex(e.currentTarget)} class="w-full">
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
		action="?/register_new"
		method="POST"
		class="flex flex-col items-center space-y-2 w-full pt-1"
		on:submit|preventDefault={(e) => register_email_pass(e.currentTarget)}
	>
		<input name="token" type="hidden" />
		<Input
			type="email"
			id="email"
			label="Почта"
			value={form?.data?.email}
			errors={form?.errors?.email}
			disabled={loading}
		/>

		<Input type="password" id="password" label="Пароль" errors={form?.errors?.password} />
		<Input
			type="password"
			id="passwordConfirm"
			label="Подтвердите пароль"
			errors={form?.errors?.passwordConfirm}
			disabled={loading}
		/>
		<div class="w-full max-w-lg pt-2">
			<button type="submit" class="rounded w-full btn btn-neutral text-white hover:btn-primary hover:text-white" disabled={loading}>Зарегистрироваться</button>
		</div>
	</form>
	<div class="text-xs text-center mt-6">
		Регистрируясь, вы принимаете <a
			href="/legal"
			class="underline text-neutral font-medium hover:cursor-pointer hover:underline hover:text-primary">условия пользовательского соглашения</a
		>.
	</div>
</div>

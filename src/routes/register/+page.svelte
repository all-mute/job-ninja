<script>
	import { Input } from '$lib/components';
	import PocketBase from 'pocketbase';
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import toast from 'svelte-french-toast';
	import { registerUserSchema } from '$lib/schemas';
	import { z } from 'zod';
	import { getRandomImageFromArray } from '$lib/avatars';
	import zoomer from '$lib/assets/avatars/zoomer.png';

	const imageUrl = getRandomImageFromArray();

	export let form;

	let loading = false;

	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

    async function login_yandex(form) {
		loading = true;
        try {
			// for safari popup problem https://github.com/pocketbase/pocketbase/discussions/2429#discussioncomment-5943061
			let w = window.open()

			const file = await fetch('static/zoomer.png').then(r => r.blob());
			console.log('avatar uploaded');

			await pb
				.collection("users")
				.authWithOAuth2({
				provider: 'yandex',
				createData: {
                    name: 'anonymous-' + Math.random().toString(36).substring(7),
					avatar: file,
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
			const avatarFile = await fetch(`/images/random_avatars`).then(r => r.blob());
			formDataNew.append('avatar', avatarFile);

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

<div class="flex flex-col items-center h-full w-full max-w-lg mx-auto px-4">
	<div class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Зарегистрироваться
	</div>
	<div class="text-center mt-1">
		Или <a
			href="/login"
			class="underline text-primary font-medium hover:cursor-pointer hover:underline">войти в аккаунт</a
		> если вы уже зарегистрировались.
	</div>
	<form method="post" action="?/oauth_yandex" on:submit|preventDefault={(e) => login_yandex(e.currentTarget)}>
		<input name="token" type="hidden" />
		<button
			class="border rounded p-2 mt-10 bg-gray-800 text-white hover:bg-gray-700"
			disabled={loading}
		>
			Login using Yandex
		</button>
	</form>
	<form
		action="?/register_new"
		method="POST"
		class="flex flex-col items-center space-y-2 w-full pt-4"
		on:submit|preventDefault={(e) => register_email_pass(e.currentTarget)}
	>
		<input name="token" type="hidden" />
		<Input
			type="email"
			id="email"
			label="Email*"
			value={form?.data?.email}
			errors={form?.errors?.email}
			disabled={loading}
		/>

		<Input type="password" id="password" label="Password*" errors={form?.errors?.password} />
		<Input
			type="password"
			id="passwordConfirm"
			label="Confirm Password*"
			errors={form?.errors?.passwordConfirm}
			disabled={loading}
		/>
		<div class="w-full max-w-lg pt-2">
			<button type="submit" class="btn btn-primary rounded w-full" disabled={loading}>Зарегистрироваться</button>
		</div>
	</form>
</div>

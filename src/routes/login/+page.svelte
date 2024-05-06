<script>
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components';
	import toast from 'svelte-french-toast';
	import PocketBase from 'pocketbase';
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	export let form;
	let loading = false;

	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

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
        try {
            await pb.collection('users').authWithOAuth2({ 
                provider: 'yandex',
                createData: {
                    name: 'anonymous-' + Math.random().toString(36).substring(7),
                },
            });
            form.token.value = pb.authStore.token;
            form.submit();
        } catch (err) {
            console.error(err);
        }
    }


    async function login_email_pass(form) {
		console.log(form);
		console.log(form.password.value);
        try {
            await pb.collection('users').authWithPassword(
				form.email.value,
				form.password.value
			);
			console.log(pb.authStore)
            form.token.value = pb.authStore.token;
            form.submit();
        } catch (err) {
            console.error(err);
        }
    }
</script>

<div class="flex flex-col items-center h-full w-full max-w-lg mx-auto px-4">
	<div class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Войти в аккаунт
	</div>
	<div class="text-center mt-1">
		Или <a
			href="/register"
			class="underline text-primary font-medium hover:cursor-pointer hover:underline">зарегистрироваться</a
		> если вы ещё не зарегистрировались.
	</div>
	<form
		method="post"
		action="?/oauth_yandex"
		on:submit|preventDefault={(e) => login_yandex(e.currentTarget)}
		disabled={loading}
	>
		<input name="token" type="hidden" />
		<button
			class="border rounded p-2 mt-10 bg-gray-800 text-white hover:bg-gray-700"
		>
			Login using Yandex
		</button>
	</form>
	<form
		action="?/login_pass"
		method="POST"
		class="flex flex-col items-center space-y-2 w-full pt-4"
		on:submit|preventDefault={(e) => login_email_pass(e.currentTarget)}
	>
		<input name="token" type="hidden" />
		<Input
			type="email"
			id="email"
			label="Email"
			value={form?.data?.email ?? ''}
			errors={form?.errors?.email}
			disabled={loading}
		/>
		<Input
			type="password"
			id="password"
			label="Password"
			errors={form?.errors?.password}
			disabled={loading}
		/>
		<div class="w-full max-w-lg">
			<a
				href="/reset-password"
				class="font-medium text-primary hover:cursor-pointer hover:underline"
			>
				Забыли пароль?</a
			>
		</div>

		<div class="w-full max-w-lg pt-2">
			<button type="submit" class="btn btn-primary rounded w-full" disabled={loading}>Войти</button>
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
</div>

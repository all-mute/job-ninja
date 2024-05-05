<script>
	import { Input } from '$lib/components';
	import PocketBase from 'pocketbase';
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	
	export let form;

	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

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
		>
			Login using Yandex
		</button>
	</form>
	<form action="?/register" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">
		<Input id="name" label="Name*" value={form?.data?.name} errors={form?.errors?.name} />

		<Input
			type="email"
			id="email"
			label="Email*"
			value={form?.data?.email}
			errors={form?.errors?.email}
		/>

		<Input
			id="description"
			label="Description"
			value={form?.data?.job_title}
			errors={form?.errors?.job_title}
		/>

		<Input type="password" id="password" label="Password*" errors={form?.errors?.password} />
		<Input
			type="password"
			id="passwordConfirm"
			label="Confirm Password*"
			errors={form?.errors?.passwordConfirm}
		/>
		<div class="w-full max-w-lg pt-2">
			<button type="submit" class="btn btn-primary rounded w-full">Зарегистрироваться</button>
		</div>
	</form>
</div>

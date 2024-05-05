<script>
    import PocketBase from 'pocketbase';
	import { string } from 'zod';
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

    const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

    async function login(form) {
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

<form method="post" on:submit|preventDefault={(e) => login(e.currentTarget)}>
    <input name="token" type="hidden" />
    <button
        class="border rounded p-2 mt-10 bg-gray-800 text-white hover:bg-gray-700"
    >
        Login using Github
    </button>
</form>
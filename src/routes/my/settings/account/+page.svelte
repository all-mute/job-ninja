<script>
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input, Modal } from '$lib/components';

	export let form;
	export let data;
	let emailModalOpen;
	let usernameModalOpen;
	let loading;

	$: emailModalOpen = false;
	$: usernameModalOpen = false;
	$: loading = false;

	const submitUpdateEmail = () => {
		loading = true;
		emailModalOpen = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					emailModalOpen = false;
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};

	const submitUpdateUsername = () => {
		loading = true;
		usernameModalOpen = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
			usernameModalOpen = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full space-y-12">
	<div class="w-full">
		<div class="text-2xl font-medium">Почта</div>
		<div class="divider" />
		<Input id="email" label="Текущая почта" value={data?.user?.email} disabled />
		<Modal label="change-email" checked={emailModalOpen}>
			<span slot="trigger" class="btn btn-accent">Сменить почту</span>
			<div slot="heading">Новая почта</div>
			<form action="?/updateEmail" method="POST" class="space-y-2" use:enhance={submitUpdateEmail}>
				<Input
					id="email"
					type="email"
					label="Введите вашу новую почту"
					required={true}
					value={form?.data?.email}
					disabled={loading}
					errors={form?.errors?.email}
				/>
				<button type="submit" class="btn btn-accent w-full" disabled={loading}
					>Сменить</button
				>
			</form>
		</Modal>
	</div>
	<div class="w-full">
		<div class="text-2xl font-medium">Логин</div>
		<div class="divider mb-0.5" />
		<Input id="username" label="Текущий логин" value={data?.user?.username} disabled />
		<Modal label="change-username" checked={usernameModalOpen}>
			<span slot="trigger" class="btn btn-accent">Cменить логин</span>
			<div slot="heading">Новый логин</div>
			<form
				action="?/updateUsername"
				method="POST"
				class="space-y-2"
				use:enhance={submitUpdateUsername}
			>
				<Input
					id="username"
					type="text"
					label="Введите ваш новый логин"
					required={true}
					value={form?.data?.username}
					errors={form?.errors?.username}
					disabled={loading}
				/>
				<button type="submit" class="btn btn-accent w-full" disabled={loading}
					>Сменить</button
				>
			</form>
		</Modal>
	</div>
</div>

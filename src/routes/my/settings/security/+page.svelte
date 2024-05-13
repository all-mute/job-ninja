<script>
	import { Input } from '$lib/components';
	export let form;
</script>

<div class="flex flex-col w-full h-full">
	<div class="w-full">
		<form action="?/updatePassword" method="POST" class="flex flex-col space-y-2 w-full">
			<div class="text-2xl font-medium">Смена пароля</div>
			<div class="divider" />
			<Input
				id="oldPassword"
				label="Старый пароль"
				type="password"
				required
				errors={form?.errors?.oldPassword}
			/>
			<Input
				id="password"
				label="Новый пароль"
				type="password"
				required
				errors={form?.errors?.password}
			/>
			<Input
				id="passwordConfirm"
				label="Новый пароль x2"
				type="password"
				required
				errors={form?.errors?.passwordConfirm}
			/>
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-accent w-full max-w-lg"> Обновить пароль </button>
			</div>
		</form>
	</div>
</div>

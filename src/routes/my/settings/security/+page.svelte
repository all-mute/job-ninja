<script>
	import { Input } from '$lib/components';
	export let form;
</script>

<div class="flex flex-col w-full h-full">
	<div class="w-full">
		<form action="?/updatePassword" method="POST" class="flex flex-col space-y-2 w-full">
			<div class="text-2xl font-medium">Change Password</div>
			<div class="divider" />
			<Input
				id="oldPassword"
				label="Old Password"
				type="password"
				required
				errors={form?.errors?.oldPassword}
			/>
			<Input
				id="password"
				label="New Password"
				type="password"
				required
				errors={form?.errors?.password}
			/>
			<Input
				id="passwordConfirm"
				label="Confirm New Password"
				type="password"
				required
				errors={form?.errors?.passwordConfirm}
			/>
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-accent w-full max-w-lg"> Update Password </button>
			</div>
		</form>
	</div>
</div>

<script>
	export let value = '';
	export let placeholder = '';
	export let id;
	export let label;
	export let type = 'text';
	export let disabled = false;
	export let required = false;

	import { page } from '$app/stores';

	export let errors;
</script>

<div class="form-control w-full mb-2">
	<div class="flex w-full justify-between place-items-end">
		<label for={id} class="label font-medium pb-1">
			<span class="label-text">{label}</span>
		</label>

		{#if id === "password"}
			<div class="pb-1 text-sm">
				<a
					href="/reset-password"
					class="text-primary underline hover:cursor-pointer"
				>
					Забыли пароль?</a
				>
			</div>
		{/if}
	</div>

	<input
		class={type === 'file'
			? 'file-input file-input-bordered w-full rounded'
			: 'input input-bordered w-full rounded'}
		{type}
		{placeholder}
		{required}
		{disabled}
		{id}
		name={id}
		{value}
	/>
	{#if errors}
		{#each errors as error}
			<label for={id} class="label py-0 pt-1">
				<span class="label-text-alt text-error">
					{error}
				</span>
			</label>
		{/each}
	{/if}
</div>

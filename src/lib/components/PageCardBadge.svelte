<script>
	export let msg;
	export let isNew = false;
	export let isOld = false;
	export let isPrivate = false;

	import { Icon, EyeSlash } from 'svelte-hero-icons';
</script>

{#if isPrivate}
	<div class="z-40">
		<div class="badge border-white justify-end pr-[3px] pt-1">
			<Icon src={EyeSlash} class="w-7 h-7 text-gray-500"/>
		</div>
	</div>
{/if}

{#if isNew}
	<div class="z-40">
		<div
			class="badge badge-success rounded-r-full gap-2 absolute -left-1 -top-1 p-4 font-extrabold shadow-md"
		>
			{msg}
		</div>
	</div>
{/if}

{#if isOld}
	<div class="z-40">
		<div class="badge badge-error rounded gap-2 absolute left-0 top-0 p-4 shadow-md">{msg}</div>
	</div>
{/if}

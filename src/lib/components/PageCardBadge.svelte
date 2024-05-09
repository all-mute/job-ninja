<script>
	export let msg;
	export let isPrivate = false;

	import { Icon, EyeSlash } from 'svelte-hero-icons';
</script>

{#if isPrivate}
	<div class="z-40">
		<div class="badge border-opacity-0 justify-end pr-[3px] pt-1">
			<Icon src={EyeSlash} class="w-7 h-7 text-gray-500"/>
		</div>
	</div>
{/if}

<script>
	import { MyPageItem } from '$lib/components';
	export let data;
	let filter = '';
	import { Icon, MagnifyingGlass, XMark } from 'svelte-hero-icons';

	$: filteredPages = data.userPages.filter(
		(page) =>
			!filter ||
			page.name.toLowerCase().includes(filter.toLowerCase()) ||
			page.tagline.toLowerCase().includes(filter.toLowerCase()) ||
			page.content.toLowerCase().includes(filter.toLowerCase())
	);
</script>

<div class="my-10 px-4">
	<div class="text-center text-7xl font-bold tracking-tight text-base-content">
		<div>Мои посты</div>
	</div>
	<div class="text-center my-5">Найдите контент по имени, теглайну или контенту.</div>

	<div class="my-5">
		<div class="flex justify-center w-full max-w-lg mx-auto border border-neutral rounded p-3">
			<div class="flex items-center gap-2 w-full">
				<Icon src={MagnifyingGlass} class="text-neutral w-5 h-5" />
				<!-- svelte-ignore a11y-autofocus -->
				<input
					type="text"
					placeholder="ML NLP Frontend Middle Yandex"
					class="w-full focus:outline-none bg-base-100"
					bind:value={filter}
					autofocus
				/>
			</div>

			{#if filter}
				<button class="focus:outline-none md:hover:scale-110" on:click={() => (filter = '')}>
					<Icon src={XMark} class="w-5 h-5" />
				</button>
			{/if}
		</div>
	</div>

	<div class="w-full mt-10 flex flex-col items-center">
		{#if filteredPages.length === 0 && filter.length == ''}
			<div class="text-center text-3xl">☹️</div>
			<div class="text-center text-3xl">Looks like you don't have any pages.</div>
			<a href="/pages/new" class="btn btn-primary max-w-md mt-4">Add One</a>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				{#each filteredPages as page}
					<div class="flex w-full">
						<MyPageItem {page} user={data.user} localUser={data.user} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

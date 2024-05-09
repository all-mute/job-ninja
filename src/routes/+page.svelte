<script>
	import { msgStore, feedSelect } from './../lib/store.js';
	import { PageCard, Hero } from '$lib/components';
	import {
		Icon,
		MagnifyingGlass,
		XMark,
		Rss,
		ChatBubbleLeftRight,
		ListBullet,
		GlobeEuropeAfrica,
		UserGroup,
		DocumentText
	} from 'svelte-hero-icons';
	import { blur } from 'svelte/transition';
	import MyPageItem from '../lib/components/MyPageItem.svelte';

	export let data;
	let filter = '';

	const handleFeedSelect = () => {
		$feedSelect = !$feedSelect;
	};

	const handleFilter = (value) => {
		if (value == '') {
			filter = ''; // Очищаем фильтр, если новое значение пустое
		} else if (filter === '') {
			filter = value; // Присваиваем значение, если фильтр undefined
		} else {
			
			filter += " " + value; // Добавляем пробел и новое значение, если фильтр не undefined
		}
	};


	function searchDocuments(filter) {
		if (!filter) return data.pages; // Возвращаем все страницы, если фильтр пустой

		const filterTerms = filter.toLowerCase().split(' '); // Разбиваем фильтр на отдельные слова

		return data.pages.filter(page => {
			// Собираем все поля страницы в одну строку для упрощения поиска
			const pageContent = [page.domain, page.company, page.grade, page.name, page.tagline, page.content].join(' ').toLowerCase();
			// Проверяем, что каждое слово из фильтра есть в содержимом страницы
			return filterTerms.every(term => pageContent.includes(term));
		});
	}


	let filteredPageNames = [];

	$: if (data && data.pages && filter) {
		filteredPageNames = filter ? searchDocuments(filter) : data.pages;
	} else {
		filteredPageNames = [];
	}

	function goto(url) {
		return function () {
			window.location.href = url;
		};
	}

	let focusedIndex = -1;

	const handleKeyDown = (e) => {
		switch (e.key) {
			case 'ArrowDown':
				// Move focus down in the list
				if (focusedIndex < filteredPageNames.length - 1) {
					focusedIndex += 1;
				}
				break;
			case 'ArrowUp':
				// Move focus up in the list
				if (focusedIndex > 0) {
					focusedIndex -= 1;
				}
				break;
			case 'Enter':
				// Trigger the click action for the currently focused item
				if (filteredPageNames[focusedIndex]) {
					goto(`/pages/${filteredPageNames[focusedIndex].id}`)();
				}
				break;
		}
	};
</script>

<div>
	<div class="mt-10 text-center text-7xl font-bold tracking-tight text-base-content">
		<!-- <div>
			<span class="text-orange-500">Job</span> Ninja
		</div> -->
	</div>
	<div class="text-center my-10 text-xl mx-[80px]">
		{#if $feedSelect}
			<div class="flex justify-center items-center gap-2">
				<div class="">
					Лента <strong>подписок</strong>
				</div>
				<div><Icon src={UserGroup} class="w-7 h-7 text-orange-500" solid /></div>
			</div>
		{:else}
			<div class="flex justify-center items-center gap-2 text-pretty">
				<div class="">Лента <strong>последних</strong> собеседований</div>
				<div><Icon src={ChatBubbleLeftRight} class="w-7 h-7 text-orange-500" solid /></div>
			</div>
		{/if}
	</div>

	<div class=" my-5 flex justify-center px-4">
		<div class=" flex items-center justify-center w-full gap-2">
			<div class=" flex w-full max-w-lg border border-neutral/10 rounded p-3">
				<div class="relative flex items-center gap-2 w-full">
					<Icon src={MagnifyingGlass} class=" text-neutral w-5 h-5" />
					<!-- svelte-ignore a11y-autofocus -->
					<input
						type="text"
						placeholder="Avito middle backend go"
						class="w-full focus:outline-none bg-base-100"
						bind:value={filter}
						on:keydown={handleKeyDown}
						autofocus
					/>
					{#if filter}
						<button class="focus:outline-none md:hover:scale-110" on:click={() => (filter = '')}>
							<Icon src={XMark} class="w-5 h-5" />
						</button>
					{/if}

				</div>
			</div>
		</div>
	</div>

	{#if data.tags}
		<div class="flex items-center mx-4">
			<div class="">
				<label class="group cursor-pointer">
					<div
						class=" flex items-center gap-2 border border-neutral/10 group-hover:border-neutral/50 py-2.5 px-4 rounded group-hover:shadow-md transition-all duration-200"
					>
						<label class="swap swap-rotate">
							<input
								type="checkbox"
								bind:checked={$feedSelect}
								class="hidden checkbox border group-hover:border-neutral transition-all duration-500"
								on:click={handleFeedSelect}
							/>

							<div class="swap-on">
								<Icon src={UserGroup} class="w-7 h-7 " solid />
							</div>
							<div class="swap-off">
								<Icon src={GlobeEuropeAfrica} class="w-7 h-7 " solid />
							</div>
						</label>
					</div>
				</label>
			</div>

			<div class="ml-5 border-r h-16 border-neutral/10" />
			<div
				class="flex overflow-x-auto md:overflow-x-auto no-scrollbar md:justify-cener items-center gap-2 px-4 w-full"
			>
				{#each data.tags as tag}
					<button
						class="btn btn-sm lowercase shadow"
						on:click={() => handleFilter(tag.name)}>{tag.name}</button
					>
				{/each}
				<button
					class="btn btn-sm lowercase shadow hover:bg-orange-500 hover:text-white"
					on:click={() => handleFilter('')}>Clear</button
				>
			</div>

			<div class="border-l h-16 border-neutral/10" />
		</div>
	{/if}

	{#if $feedSelect}
		<div class="flex justify-center pt-4">
			<div class="flex flex-col w-full px-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{#if filter !== ''}
					{#each filteredPageNames as page}
					{#each data.users as user}
						{#if page.user === user.id}
						{#if data.user.following.includes(page.user)}
							<MyPageItem
							{page}
							{user}
							localUser={data.user}
							isPrivate={page.private}
							/>
						{/if}
						{/if}
					{/each}
					{/each}
				{/if}
				{#if filter === ''}
					{#each data.pages as page}
					{#each data.users as user}
							{#if page.user === user.id}
							{#if data.user.following.includes(page.user)}
							<MyPageItem
								{page}
								{user}
								localUser={data.user}
								isPrivate={page.private}
							/>
							{/if}
							{/if}
					{/each}
					{/each}
				{/if}
			</div>
		</div>
	{:else}
		<div class="flex justify-center pt-4">
			<div class="flex flex-col w-full px-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#if filter !== ''}
				{#each filteredPageNames as page}
					{#each data.users as user}
						{#if page.user === user.id}
							<MyPageItem
							{page}
							{user}
							localUser={data.user}
							isPrivate={page.private}
							/>
						{/if}
					{/each}
				{/each}
			{/if}
			{#if filter === ''}
				{#each data.pages as page}
				{#each data.users as user}
					{#if page.user === user.id}
					<MyPageItem
						{page}
						{user}
						localUser={data.user}
						isPrivate={page.private}
					/>
					{/if}
				{/each}
				{/each}
			{/if}
			</div>
		</div>
	{/if}
	
</div>

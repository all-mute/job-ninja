<script>
	import { getImageURL } from '$lib/utils';
	import {
		Icon,
		PencilSquare,
		Heart,
		HandThumbUp,
		CheckBadge,
		ExclamationTriangle
	} from 'svelte-hero-icons';
	import { Modal, MyPageItem, DashboardHeader } from '$lib/components';

	import Stat from '$lib/components/Stat.svelte';
	export let data;

	let staleCount = 0;
	let verifiedCount = 0;

	const incrementVerifiedCount = () => {
		verifiedCount++;
	};

	const incrementStaleCount = () => {
		staleCount++;
	};

	const countMyFollowers = (users, currentUser) => {
		if (!currentUser || !currentUser.id) {
			return 0;
		}
		const count = users.reduce((acc, user) => {
			return acc + (user.following.includes(currentUser.id) ? 1 : 0);
		}, 0);

		return count;
	};

	const countUsersFollowing = (following, users) => {
		const followingSet = new Set(following);
		let count = 0;

		for (let i = 0; i < users.length; i++) {
			if (followingSet.has(users[i].id)) {
				count++;
			}
		}

		return count;
	};

	let count = {
		likes: data.user.likes.length,
		favorites: data.user.favorites.length
	};

	const pageCount = data.pages.reduce((count, page) => {
		if (page.user === data.user.id) {
			return count + 1;
		}
		return count;
	}, 0);

	// const isPageVerified = (page) => {
	// 	if (page.verified) {
	// 		return true;
	// 	}
	// 	return false;
	// };

	function getFollowers() {
		let followers = [];
		for (let i = 0; i < data.users.length; i++) {
			if (data.users[i].following.includes(data.user.id)) {
				followers.push(data.users[i].name);
			}
		}
		return followers;
	}
</script>

<div>
	<DashboardHeader
		name={data.user.name}
		userId={data.user.id}
		title={data.user.description}
		
		avatar={data.user?.avatar
			? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
			: `https://ui-avatars.com/api/?name=${data.user?.name}`}
		{pageCount}
		userBadges={data.user.badges}
		badges={data.badges}
		pageLikes={count.likes}
		pageFavorites={count.favorites}
		followers={countMyFollowers(data.users, data.user)}
		following={countUsersFollowing(data.user.following, data.users)}
	/>
</div>

<div class="flex flex-col mx-4">
	<div class="text-lg md:text-xl font-bold badge badge-neutral py-3 rounded uppercase">
		Статистика постов
	</div>

	<!-- LARGE BREAKPOINT -->
	<!-- This should only display on large screens -->
	<div class="hidden md:flex gap-2 h-full my-2">
		<div class="w-full">
			<Stat
				statTitle="Опубликованные собеседования"
				statValue={verifiedCount}
				statDescription="Функционал приватности СКОРО."
				><Icon src={CheckBadge} class="w-12 h-12 pr-2 text-success" solid /></Stat
			>
		</div>
		<div class="w-full">
			<Stat
				statTitle="Приватные собеседования"
				statValue={staleCount}
				statDescription="Функционал приватности СКОРО."
				><Icon src={ExclamationTriangle} class="w-12 h-12 pr-2 text-warning" solid /></Stat
			>
		</div>

		<div class="w-full">
			<Stat
				statTitle="Избранные"
				statValue={count.favorites}
				statDescription="Страницы, которые вы добавили в избранное."
				><Icon src={Heart} class="w-12 h-12 pr-2 text-error" solid /></Stat
			>
		</div>

		<div class="w-full">
			<Stat
				statTitle="Лайки"
				statValue={count.likes}
				statDescription="Страницы, которые вы лайкнули."
			>
				<Icon src={HandThumbUp} class="w-12 h-12 pr-2 text-info" solid />
			</Stat>
		</div>
	</div>

	<div class=" grid grid-cols-1 md:grid-cols-4 gap-2">
		<div class="">
			<div class="md:hidden my-2">
				<Stat
					statTitle="Опубликованные собеседования"
					statValue={verifiedCount}
					statDescription="Функционал приватности СКОРО."
					><Icon src={CheckBadge} class="w-12 h-12 pr-2 text-success" solid /></Stat
				>
			</div>

			<div class=" flex flex-col gap-2 my-2">
				{#each data.pages as page}
					{#if page.user === data.user.id}
						{#if page.verified}
							<div class="hidden">
								{incrementVerifiedCount()}
							</div>

							<a
								class=" border border-success/50 bg-success/10 md:hover:bg-success/20 md:hover:shadow rounded transition-shadow duration-200"
								href={`/pages/${page.id}`}
							>
								<div class="flex items-start h-16 overflow-hidden text-ellipsis rounded">
									<!-- IMAGE -->
									{#if page.thumbnail}
										<div class="">
											<div class="h-16 w-12">
												<img
													class="h-full object-cover rounded rounded-r shadow"
													src={page?.thumbnail
														? getImageURL(page.collectionId, page.id, page.thumbnail, '0x0')
														: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${page.name}`}
													alt="page thumbnail"
												/>
											</div>
										</div>
									{/if}

									<div class="flex justify-between gap-2 w-full items-start p-2 h-full">
										<div class="text-sm font-semibold">
											{page.name}
										</div>
									</div>
									<div
										class="md:hover:scale-[102%] active:scale-[98%] transition-transform duration-200 flex items-center h-full"
									>
										<a href={`/pages/${page.id}/edit`}>
											<Icon src={PencilSquare} class="w-7 h-7 pr-2" solid />
										</a>
									</div>
								</div>
							</a>
						{/if}
					{/if}
				{/each}
			</div>
		</div>

		<div class="">
			<div class="md:hidden my-2">
				<Stat
					statTitle="Приватные собеседования"
					statValue={staleCount}
					statDescription="Функционал приватности СКОРО."
					><Icon src={ExclamationTriangle} class="w-12 h-12 pr-2 text-warning" solid /></Stat
				>
			</div>

			<div class=" flex flex-col gap-2 my-2">
				{#each data.pages as page}
					{#if page.user === data.user.id}
						{#if page.private}
							<div class="hidden">
								{incrementStaleCount()}
							</div>

						{/if}
					{/if}
				{/each}
			</div>
		</div>

		<div class="">
			<div class="md:hidden my-2">
				<Stat
					statTitle="Избранные"
					statValue={count.favorites}
					statDescription="Страницы, которые вы добавили в избранное."
					><Icon src={Heart} class="w-12 h-12 pr-2 text-error" solid /></Stat
				>
			</div>

			<div class=" flex flex-col gap-2 my-2">
				{#each data.user.favorites as favorite}
					{#each data.pages as page}
						{#if page.id === favorite}
							<a
								class=" border border-error/50 bg-error/10 md:hover:bg-error/20 md:hover:shadow rounded transition-shadow duration-200"
								href={`/pages/${page.id}`}
							>
								<div class="flex items-start h-16 overflow-hidden text-ellipsis rounded">
									<!-- IMAGE -->
									{#if page.thumbnail}
										<div class="">
											<div class="h-16 w-12">
												<img
													class="h-full object-cover rounded rounded-r shadow"
													src={page?.thumbnail
														? getImageURL(page.collectionId, page.id, page.thumbnail, '0x0')
														: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${page.name}`}
													alt="page thumbnail"
												/>
											</div>
										</div>
									{/if}

									<div class="flex justify-between gap-2 w-full items-start p-2 h-full">
										<div class="text-sm font-semibold">
											{page.name}
										</div>
									</div>
								</div>
							</a>
						{/if}
					{/each}
				{/each}
			</div>
		</div>

		<div class="">
			<div class="md:hidden my-2">
				<Stat statTitle="Лайки" statValue={count.likes} statDescription="Страницы, которые вы лайкнули."
					><Icon src={HandThumbUp} class="w-12 h-12 pr-2 text-info" solid /></Stat
				>
			</div>

			<div class=" flex flex-col gap-2 my-2">
				{#each data.user.likes as like}
					{#each data.pages as page}
						{#if page.id === like}
							<a
								class=" border border-info/50 bg-info/10 md:hover:bg-info/20 md:hover:shadow rounded transition-shadow duration-200"
								href={`/pages/${page.id}`}
							>
								<div class="flex items-start h-16 overflow-hidden text-ellipsis rounded">
									<!-- IMAGE -->
									{#if page.thumbnail}
										<div class="">
											<div class="h-16 w-12">
												<img
													class="h-full object-cover rounded rounded-r shadow"
													src={page?.thumbnail
														? getImageURL(page.collectionId, page.id, page.thumbnail, '0x0')
														: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${page.name}`}
													alt="page thumbnail"
												/>
											</div>
										</div>
									{/if}

									<div class="flex justify-between gap-2 w-full items-start p-2 h-full">
										<div class="text-sm font-semibold">
											{page.name}
										</div>
									</div>
								</div>
							</a>
						{/if}
					{/each}
				{/each}
			</div>
		</div>
	</div>
</div>

<div class=" bg-base-100 px-4 my-5 md:my-10">
	<!-- <input type="checkbox" checked="checked" /> -->
	<div
		id="mypages"
		class=" text-xl font-bold badge badge-outline text-neutral/50 py-3 rounded uppercase"
	>
		Мои посты
	</div>

	<div class="my-2">
		{#if data.pages.filter((page) => page.user === data.user.id).length > 0}
			<div class="">
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{#each data.pages as page}
						{#if page.user === data.user.id}
							<MyPageItem {page} user={data.user} localUser={data.user} />
						{/if}
					{/each}
				</div>
			</div>
		{:else}
			<div class="flex flex-col gap-2 my-7">
				<div class="text-lg font-bold text-neutral/50">Нет страниц.</div>
				<div class=" text-neutral/50">
					<a href="/pages/new" class=" underline">Создай</a>
					страницу, чтобы начать.
				</div>
			</div>
		{/if}
	</div>
</div>

<script>
	import { fade } from 'svelte/transition';
	import { PUBLIC_HOME_URL, PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import { enhance } from '$app/forms';
	import { getImageURL } from '$lib/utils';
	import { Modal } from '$lib/components';

	import {
		Icon,
		Heart,
		HandThumbUp,
		Bookmark,
		InboxArrowDown,
		PencilSquare,
		ArrowPathRoundedSquare,
		CheckCircle,
		Clock,
		Link,
		Trash
	} from 'svelte-hero-icons';
	import readtime from 'read-time';
	export let data;

	import Toc from 'svelte-toc';

	import toast from 'svelte-french-toast';
	let modalOpen;
	let loading = false;

	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	onMount(async () => {
		try {
			const pageLogData = {
				page: data.page.id,
				user: data.user.id,
				username: data.user.name,
				pagename: data.page.name
			};

			const response = await fetch('/api/pageLog', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(pageLogData)
			});

			if (response.ok) {
				const result = await response.json();
				console.log(result);
			} else {
				const errorData = await response.json();
				console.error('Failed to log data:', errorData.message);
			}
		} catch (error) {
			console.error('Error occurred:', error);
		}
	});

	const submitDeletePage = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Page deleted successfully!');
					await update();
					toast('Returning Home...');
					window.location.href = '/'; // this redirects to the root route
					break;
				case 'error':
					toast.error('Could not delete page. Try again later.');
					break;
				default:
					await update();
			}
			loading = false;
		};
	};

	$: modalOpen = false;

	const readTime = readtime(data.page.content);

	const dateTimeString = data.page.updated;
	const dateTime = new Date(dateTimeString);

	const options = {
		timeZone: 'Europe/Moscow', // Specify the desired time zone
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};

	const formattedDateTime = dateTime.toLocaleString('ru-RU', options);

	const getTotalLikes = (users, pages) => {
		const total = users.reduce((count, user) => {
			if (user.likes.includes(pages.id)) {
				return count + 1;
			}
			return count;
		}, 0);

		return total;
	};

	const getTotalFavorites = (users, pages) => {
		const total = users.reduce((count, user) => {
			if (user.favorites.includes(pages.id)) {
				return count + 1;
			}
			return count;
		}, 0);

		return total;
	};
</script>

<!-- Spinner displayed while loading -->

<div class="flex">
	<div
		class="flex flex-col w-full md:mt-10 max-w-4xl mx-auto px-7 py-7 md:border border-neutral/10 rounded md:shadow"
	>
		<!-- CREATOR -->
		{#each data.users as creator}
			{#if creator.id === data.page.user}
				<div class="w-full flex gap-2">
					<div class="w-full flex gap-3">
						<div class="relative place-content-center">
							<a href={`/people/${creator.id}`}>
								<img
									class="w-9 h-8 md:w-10 md:h-10 object-cover rounded-full border border-neutral/10 hover:saturate-150 hover:scale-[102%] transition-all duration-50 active:scale-[98%]"
									src={creator?.avatar
										? getImageURL(creator?.collectionId, creator?.id, creator?.avatar)
										: `https://ui-avatars.com/api/?name=${creator?.name}`}
									alt="User avatar"
								/>
							</a>
						</div>

						<div class="w-full flex justify-between">
							<div class="flex flex-col place-content-center">
								<div class="text-sm text-neutral font-semibold primary-content md:text-base">
									{creator.name}
								</div>
								<div class="font-medium text-xs text-gray-400 md:text-sm">
									{formattedDateTime}
								</div>
								<!-- <div class="text-sm font-medium secondary-content">
									{creator.description}
								</div> -->
							</div>
							<div>
								{#if creator.id != data.user.id}
									<div class="my-2">
										<form action="?/followUser" method="POST" use:enhance>
											<button type="submit" class="active:scale-[98%] transition-all duration-200">
												<input type="hidden" name="id" value={creator.id} />
												<div>
													{#if data.user.following.includes(creator.id)}
														<input type="hidden" name="follow" value="true" />
														<button class="flex btn btn-xs btn-success capitalize rounded">
															<!-- <Icon src={CheckCircle} class="text-primary w-5 h-5" solid /> -->

															<div class="flex gap-2 items-center">
																<div>Подписан</div>
															</div>
														</button>
													{:else}
														<input type="hidden" name="follow" value="false" />

														<button class="flex btn btn-xs capitalize rounded">
															<!-- <Icon src={PlusCircle} class="text-primary w-5 h-5" /> -->
															<div>Подписаться</div>
														</button>
													{/if}
												</div>
											</button>
										</form>
									</div>
								{/if}
							</div>

						</div>
						
					</div>
				</div>
			{/if}
		{/each}

		<!-- BADGES + TAGLINE -->
		<div class="mt-4 mb-4">
			<div class="badge badge-xl badge-neutral font-medium text-white rounded capitalize my-1 py-3">{data.page.company}</div>
			<div class="badge badge-xl badge-domain font-medium border-secondary rounded capitalize my-1 py-3">{data.page.domain}</div>
			<div class="badge badge-xl badge-ghost font-medium rounded capitalize my-1 py-3">{data.page.grade}</div>

			<div class="mt-2 text-sm text-base-content/75">
				{#if data.page.tagline}
					#{@html data.page.tagline.replace(/\s+/g, ' #')}
				{:else}
					&nbsp;
				{/if}
			</div>
		</div>

		<!-- TITLE -->
		<div>
			<div class="text-neutral text-4xl font-bold md:text-5xl">
				{data.page.name}<span />
			</div>
		</div>
		<!-- <div>
			<div class="mt-1">
				<a class="text-primary hover:underline" target="_blank" href={data.page.url}
					>{data.page.url}</a
				>
			</div>
		</div> -->

		<!-- POSITION LINK -->
		<div class="my-2 mb-8 flex">
			<div class="text-sm md:text-base text-gray-500 font-base primary-content">
				<div class="flex gap-2 items-center">
					<div>
						<Icon src={Link} class="w-4 h-4" />
					</div>
					<div>
						<a href="{data.page.url}" target="_blank" class="hover:underline">
							ссылка на вакансию
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- IMAGE -->
		{#if data.page.thumbnail}
			<div class="avatar">
				<div class="w-full h-64 md:h-96 rounded shadow-lg">
					<img
						in:fade
						class=""
						src={data.page?.thumbnail
							? getImageURL(data.page.collectionId, data.page.id, data.page.thumbnail, '0x0')
							: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${data.page.name}`}
						alt="page thumbnail"
					/>
				</div>
			</div>

			<!-- CONTENT -->
			<div class="mt-10 page-content font-base text-neutral overflow-x-hidden">
				{@html data.page.content}
			</div>
		{:else}
			<div class="page-content font-base text-neutral overflow-x-hidden">
				{@html data.page.content}
			</div>
		{/if}

		<!-- PAGE METAGS -->
		<div
			class="flex flex-row justify-between gap-2 sticky z-50 bg-base-100 py-2 mt-5"
		>
			<!-- <div class="sticky bg-base-100 flex md:items-center flex-col gap-2 md:flex-row justify-between"> -->
			<!-- TAGS -->
			<!-- <div class="flex flex-wrap gap-2">
				{#if data.page.expand.tags}
					{#each data.page.expand.tags as tag}
						<div class="badge badge-outline py-3">{tag.name}</div>
					{/each}
				{/if}
			</div> -->

			<!-- ACTION BUTTONS -->
			<div class="flex gap-5">
				<div>
					<!-- LIKE -->
					<form action="?/likePage" method="POST" use:enhance>
						<button
							type="submit"
							class="hover:scale-105 active:scale-95 transition-all duration-200 flex items-center"
						>
							<input type="hidden" name="id" value={data.page.id} />
							<div>
								{#if data.user.likes.includes(data.page.id)}
									<input type="hidden" name="like" value="true" />
									<Icon src={Heart} class="text-warning w-7 h-7" solid />
								{:else}
									<input type="hidden" name="like" value="false" />
									<Icon src={Heart} class="text-neutral w-7 h-7" />
								{/if}
							</div>
						</button>
					</form>
				</div>
				{getTotalLikes(data.users, data.page)}

				<!-- FAVORITE -->
				<div>
					<form action="?/favoritePage" method="POST" use:enhance>
						<button
							type="submit"
							class="hover:scale-105 active:scale-95 transition-all duration-200 flex items-center"
						>
							<input type="hidden" name="id" value={data.page.id} />
							<div>
								{#if data.user.favorites.includes(data.page.id)}
									<input type="hidden" name="favorite" value="true" />
									<Icon src={Bookmark} class="text-info w-7 h-7" solid />
								{:else}
									<input type="hidden" name="favorite" value="false" />
									<Icon src={Bookmark} class="text-neutral w-7 h-7" />
								{/if}
							</div>
						</button>
					</form>
				</div>
				{getTotalFavorites(data.users, data.page)}

				<!-- SHARE -->
				<!-- TODO: CHANEGE TO SOMETHING LIKE SENDGRID TO MAKE LINK CLICKABLE IN EMAIL CLIENT -->
				<div>
					<a
						href={`mailto:?subject=Nexum: ${data.page.name}&body=${PUBLIC_HOME_URL}/pages/${data.page.id}`}
					>
						<Icon
							src={InboxArrowDown}
							class="text-content-neutral w-7 h-7 hover:scale-105 active:scale-95 transition-all duration-200"
						/>
					</a>
				</div>
			</div>
			<div class="flex gap-5">
				<!-- EDIT -->
				{#if data.page.user === data.user.id}
					<a href="/pages/{data.page.id}/edit">
						<Icon
							src={PencilSquare}
							class="text-content-neutral w-7 h-7 hover:scale-105 active:scale-95 transition-all duration-200"
						/>
					</a>
				{/if}

				<!-- DELETE -->
				{#if data.page.user === data.user.id}
					<div class="">
						<Modal label={data.page.id} checked={modalOpen}>
							<span slot="trigger" class="">
								<Icon
									src={Trash}
									class="text-content-neutral w-7 h-7 hover:scale-105 active:scale-95 transition-all duration-200"
								/>
							</span>
							<div slot="heading">
								<div class="text-2xl">Удалить {data.page.name}</div>
								<div class="text-base font-normal mt-2">
									Вы уверены, что хотите удалить эту страницу? После удаления страницы она не может быть
									восстановлена.
								</div>
							</div>
							<div slot="actions" class="flex w-full items-center justify-center space-x-2">
								<label for={data.page.id} class="btn btn-outline">Cancel</label>
								<form action="/?/deletePage" method="POST" use:enhance={submitDeletePage}>
									<input type="hidden" name="id" value={data.page.id} />
									<button type="submit" class="btn btn-error" disabled={loading}>Delete</button>
								</form>
							</div>
						</Modal>
					</div>
				{/if}
			</div>
		</div>

	</div>

	<!-- TOC
	<div class="mt-10 hidden xl:flex justify-start">
		<Toc title={'Page Contents'} autoHide={true} />
	</div> -->
</div>

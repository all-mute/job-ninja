<script>
	import { fade } from 'svelte/transition';
	import PageCardBadge from '$lib/components/PageCardBadge.svelte';
	import { enhance } from '$app/forms';
	import { Modal } from '$lib/components';
	import { getImageURL, getFormattedDateTime } from '$lib/utils';
	import toast from 'svelte-french-toast';
	import MyPageItem from '$lib/components/MyPageItem.svelte';

	import { Icon, PencilSquare, Trash, Check, ArrowPathRoundedSquare } from 'svelte-hero-icons';

	export let page;
	export let user;
	export let localUser;

	const formattedDateTime = getFormattedDateTime(page.updated);

	// let modalOpen;
	let loading = false;

	const openModal = () => {
		modalOpen = true;
	};

	const submitDeletePage = () => {
		loading = true;
		return async ({ result, update }) => {
			if (result.type === 'success') {
				toast.success('Page deleted successfully!');
				await update();
			} else {
				toast.error('Could not delete page. Try again later.');
			}

			loading = false;
		};
	};

	$: modalOpen = false;
</script>

<div
	in:fade
	class="flex w-full rounded border border-neutral hover:border-neutral/50 transition-all duration-100 hover:shadow-lg group"
>
	<div class="w-full flex gap-0 items-center rounded">
		<div class="w-full h-full p-2">
			<a href="/pages/{page.id}" class="">
				<div class="flex flex-col justify-between h-full">
					<div>
						<div class=" font-bold">{page.name}</div>
						<div class=" text-sm text-base-content/75">
							{page.grade} {page.domain}
							{page.tagline.length > 10
								? page.tagline.slice(0, 10) + '...'
								: page.tagline
							}
						</div>

						<div class="badge badge-sm badge-neutral rounded py-3 mt-2">{page.company}</div>
					</div>

					<div class="flex flex-col gap-2 mt-5">
						{#if user}
							<div class="flex items-center gap-1">
								<img
									class="w-6 h-6 object-cover rounded-full border border-neutral group-hover:saturate-150 transition-color duration-300"
									src={user?.avatar
										? getImageURL(user?.collectionId, user?.id, user?.avatar)
										: `https://ui-avatars.com/api/?name=${user?.name}`}
									alt="User avatar"
								/>

								<div class="text-sm text-base-content/75">{user.name}</div>
							</div>
						{/if}

						<div class="font-bold text-xs">
							<div class="flex gap-1">
								<Icon src={ArrowPathRoundedSquare} class="w-4 h-4" />
								<div class="font-medium text-base-content/75">{formattedDateTime}</div>
							</div>
						</div>
					</div>
				</div>
			</a>
		</div>
	</div>
</div>

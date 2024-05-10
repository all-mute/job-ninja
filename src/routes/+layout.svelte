<script>
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import { getImageURL } from '$lib/utils';
	import {
		Icon,
		Plus,
		Cog6Tooth,
		Power,
		Users,
		ChatBubbleLeftRight,
		MagnifyingGlassCircle,
		RectangleGroup,
		RectangleStack,
		UserCircle,
		InformationCircle,
		Home
	} from 'svelte-hero-icons';
	import { Footer } from '$lib/components';
	import { PUBLIC_SEARCH_URL } from '$env/static/public';
	import { onMount } from 'svelte';

	export let data;

	let isLoaded = false;

	onMount(async () => {
		// Simulating an asynchronous action. In real scenarios, this could be an API call or some resource loading.
		// await new Promise((resolve) => setTimeout(resolve));

		isLoaded = true;
	});

	import { page } from '$app/stores';
</script>

<Toaster />
<div class="min-h-full">
	<nav class="navbar bg-base-100 border-b border-neutral/10 max-w-5xl mx-auto">
		<div class="flex-1">
			<a href="/" class="normal-case text-xl">
				<div>
					<svg class="w-[50px] h-[50px]" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.3125 25.3125C16.6232 25.3125 16.875 25.0607 16.875 24.75C16.875 24.4393 16.6232 24.1875 16.3125 24.1875C16.0018 24.1875 15.75 24.4393 15.75 24.75C15.75 25.0607 16.0018 25.3125 16.3125 25.3125Z" fill="black"/>
						<path d="M19.6875 25.3125C19.9982 25.3125 20.25 25.0607 20.25 24.75C20.25 24.4393 19.9982 24.1875 19.6875 24.1875C19.3768 24.1875 19.125 24.4393 19.125 24.75C19.125 25.0607 19.3768 25.3125 19.6875 25.3125Z" fill="black"/>
						<path d="M18 25.3125C18.3107 25.3125 18.5625 25.0607 18.5625 24.75C18.5625 24.4393 18.3107 24.1875 18 24.1875C17.6893 24.1875 17.4375 24.4393 17.4375 24.75C17.4375 25.0607 17.6893 25.3125 18 25.3125Z" fill="black"/>
						<path d="M16.3125 27C16.6232 27 16.875 26.7482 16.875 26.4375C16.875 26.1268 16.6232 25.875 16.3125 25.875C16.0018 25.875 15.75 26.1268 15.75 26.4375C15.75 26.7482 16.0018 27 16.3125 27Z" fill="black"/>
						<path d="M19.6875 27C19.9982 27 20.25 26.7482 20.25 26.4375C20.25 26.1268 19.9982 25.875 19.6875 25.875C19.3768 25.875 19.125 26.1268 19.125 26.4375C19.125 26.7482 19.3768 27 19.6875 27Z" fill="black"/>
						<path d="M18 27C18.3107 27 18.5625 26.7482 18.5625 26.4375C18.5625 26.1268 18.3107 25.875 18 25.875C17.6893 25.875 17.4375 26.1268 17.4375 26.4375C17.4375 26.7482 17.6893 27 18 27Z" fill="black"/>
						<path d="M16.3125 28.6875C16.6232 28.6875 16.875 28.4357 16.875 28.125C16.875 27.8143 16.6232 27.5625 16.3125 27.5625C16.0018 27.5625 15.75 27.8143 15.75 28.125C15.75 28.4357 16.0018 28.6875 16.3125 28.6875Z" fill="black"/>
						<path d="M19.6875 28.6875C19.9982 28.6875 20.25 28.4357 20.25 28.125C20.25 27.8143 19.9982 27.5625 19.6875 27.5625C19.3768 27.5625 19.125 27.8143 19.125 28.125C19.125 28.4357 19.3768 28.6875 19.6875 28.6875Z" fill="black"/>
						<path d="M18 28.6875C18.3107 28.6875 18.5625 28.4357 18.5625 28.125C18.5625 27.8143 18.3107 27.5625 18 27.5625C17.6893 27.5625 17.4375 27.8143 17.4375 28.125C17.4375 28.4357 17.6893 28.6875 18 28.6875Z" fill="black"/>
						<path d="M26.6149 15.75H9.38509C8.68647 15.7508 8.01669 16.0287 7.52269 16.5227C7.02869 17.0167 6.7508 17.6865 6.75 18.3851V20.4274C6.7508 21.126 7.02869 21.7958 7.52269 22.2898C8.01669 22.7838 8.68647 23.0617 9.38509 23.0625H26.6149C27.3135 23.0617 27.9833 22.7838 28.4773 22.2898C28.9713 21.7958 29.2492 21.126 29.25 20.4274V18.3851C29.2492 17.6865 28.9713 17.0167 28.4773 16.5227C27.9833 16.0287 27.3135 15.7508 26.6149 15.75ZM24.1875 18.0989C24.4859 18.0989 24.772 17.9804 24.983 17.7694C25.194 17.5584 25.3125 17.2723 25.3125 16.9739C25.3125 16.9401 25.3054 16.9081 25.3025 16.875H25.8097C25.6824 17.5098 25.3392 18.0809 24.8383 18.4911C24.3374 18.9013 23.7099 19.1253 23.0625 19.125H22.5C21.8537 19.1222 21.2281 18.897 20.7283 18.4873C20.2285 18.0775 19.885 17.5082 19.7556 16.875H23.0725C23.0696 16.9081 23.0625 16.94 23.0625 16.9739C23.0625 17.1216 23.0916 17.2679 23.1481 17.4044C23.2047 17.5409 23.2875 17.6649 23.392 17.7694C23.4965 17.8738 23.6205 17.9567 23.757 18.0133C23.8935 18.0698 24.0398 18.0989 24.1875 18.0989ZM14.0625 18.0989C14.3609 18.0989 14.647 17.9804 14.858 17.7694C15.069 17.5584 15.1875 17.2723 15.1875 16.9739C15.1875 16.9401 15.1804 16.9081 15.1775 16.875H15.6846C15.5574 17.5098 15.2141 18.0809 14.7133 18.4911C14.2124 18.9013 13.5849 19.1253 12.9375 19.125H12.375C11.7279 19.1257 11.1006 18.9017 10.6002 18.4914C10.0998 18.081 9.7574 17.5097 9.63135 16.875H12.9475C12.9446 16.9081 12.9375 16.94 12.9375 16.9739C12.9375 17.1216 12.9666 17.2679 13.0231 17.4044C13.0797 17.5409 13.1625 17.6649 13.267 17.7694C13.3715 17.8738 13.4955 17.9567 13.632 18.0133C13.7685 18.0698 13.9148 18.0989 14.0625 18.0989Z" fill="black"/>
						<path d="M10.503 14.9403C10.6394 14.9404 10.7711 14.8909 10.8738 14.8011C12.4118 13.4539 14.3905 14.7189 14.4767 14.775C14.6012 14.8555 14.7524 14.8836 14.8975 14.8532C15.0425 14.8229 15.1698 14.7365 15.2515 14.6128C15.3332 14.4891 15.3628 14.3382 15.3339 14.1928C15.3049 14.0474 15.2198 13.9194 15.0969 13.8364C14.1463 13.2061 11.885 12.4203 10.1322 13.9546C10.046 14.03 9.98498 14.1298 9.95711 14.2408C9.92925 14.3518 9.93591 14.4687 9.9762 14.5758C10.0165 14.683 10.0885 14.7752 10.1826 14.8404C10.2768 14.9055 10.3885 14.9403 10.503 14.9403Z" fill="black"/>
						<path d="M20.9372 14.775C21.0207 14.7206 23.0004 13.4525 24.5402 14.8011C24.5958 14.8498 24.6604 14.887 24.7304 14.9107C24.8004 14.9345 24.8744 14.9441 24.9481 14.9393C25.0218 14.9344 25.0939 14.9151 25.1601 14.8823C25.2264 14.8496 25.2856 14.8042 25.3342 14.7486C25.3829 14.693 25.4202 14.6284 25.4439 14.5584C25.4676 14.4884 25.4773 14.4144 25.4725 14.3407C25.4676 14.267 25.4482 14.1949 25.4155 14.1287C25.3828 14.0624 25.3373 14.0033 25.2818 13.9546C23.5289 12.4203 21.2684 13.2061 20.317 13.8364C20.1942 13.9194 20.109 14.0474 20.08 14.1928C20.0511 14.3382 20.0807 14.4891 20.1624 14.6128C20.2442 14.7365 20.3714 14.8229 20.5165 14.8532C20.6616 14.8836 20.8128 14.8555 20.9372 14.775Z" fill="black"/>
						<path d="M35.3919 11.0284C35.0287 10.2535 34.4614 9.5921 33.7507 9.11532C33.0401 8.63854 32.213 8.36435 31.3582 8.32219C32.5614 6.78786 32.0716 4.47891 32.0493 4.37805C32.0215 4.25313 31.9519 4.14142 31.852 4.06134C31.7521 3.98126 31.628 3.93758 31.5 3.9375C29.4923 3.9375 28.0942 4.48571 27.345 5.5665C26.9206 6.21148 26.7181 6.97726 26.7682 7.74771C24.2278 5.5804 20.9735 4.43297 17.6356 4.52763C14.2976 4.62229 11.1136 5.95232 8.70011 8.26012C6.28664 10.5679 4.81548 13.6893 4.57156 17.0196C4.32764 20.35 5.32832 23.6524 7.37979 26.2872C9.43126 28.922 12.3875 30.7017 15.6761 31.2817C18.9646 31.8617 22.3513 31.2007 25.1804 29.4267C28.0095 27.6526 30.0795 24.8918 30.9896 21.6789C31.8997 18.4661 31.5851 15.0298 30.1067 12.0356C30.7654 12.3475 31.4853 12.5092 32.2141 12.5088C33.2307 12.4885 34.2283 12.2296 35.1266 11.7532C35.2549 11.689 35.3538 11.5782 35.4032 11.4434C35.4525 11.3087 35.4484 11.1602 35.3919 11.0284ZM28.2694 6.20775C28.7419 5.52634 29.6644 5.1462 31.016 5.0751C31.0814 5.73401 31.088 6.96088 30.3909 7.7346C29.8943 8.28557 29.0885 8.53273 27.9965 8.47232C27.889 8.09565 27.8577 7.7013 27.9046 7.3124C27.9515 6.9235 28.0755 6.54809 28.2694 6.20775ZM24.2269 7.3125H11.7731C13.6622 6.20741 15.8114 5.62497 18 5.62497C20.1886 5.62497 22.3378 6.20741 24.2269 7.3125ZM10.1544 8.4375H25.8456C26.8229 9.2418 27.6721 10.1902 28.364 11.25H7.63588C8.32781 10.1902 9.17703 9.24179 10.1544 8.4375ZM18 30.375C15.8815 30.3765 13.7982 29.8338 11.9497 28.7988C10.1013 27.7639 8.5497 26.2714 7.44378 24.4645C6.33786 22.6576 5.71467 20.5969 5.63397 18.4799C5.55327 16.363 6.01777 14.2608 6.98293 12.375H29.0171C29.9822 14.2608 30.4467 16.363 30.366 18.4799C30.2853 20.5969 29.6621 22.6576 28.5562 24.4645C27.4503 26.2714 25.8987 27.7639 24.0503 28.7988C22.2018 29.8338 20.1185 30.3765 18 30.375Z" fill="black"/>
					</svg>
					<!-- <span class="text-orange-600 font-bold">Job </span>Ninja -->
				</div>
			</a>
		</div>
		<div class="flex-none">
			{#if $page.url.pathname === "/login"}
				<div class="dropdown dropdown-end">
					<a href="/register" class="rounded-full btn bg-white text-black/90 hover:bg-orange-500 hover:text-white">Регистрация</a>
				</div>
			{:else if $page.url.pathname === "/register"}
				<div class="dropdown dropdown-end">
					<a href="/login" class="rounded-full btn bg-white text-black/90 hover:bg-orange-500 hover:text-white">Вход по аккаунту</a>
				</div>
			{:else if !data.user}
				<div class="dropdown dropdown-end">
					<a href="/login" class="rounded-full btn bg-white text-black/90 hover:text-black">Вход</a>
					<a href="/register" class="rounded-full btn bg-orange-500 text-white  hover:bg-orange-400 hover:text-white">Регистрация</a>
				</div>
			{:else}
				<div class="dropdown dropdown-end mr-4">
					<div class="dropdown dropdown-end">
						<a href="/pages/new" class="rounded-full btn bg-white text-black/90 hover:bg-orange-500 hover:text-white">Создать запись</a>
					</div>
					<!-- <button classs="btn">
						<a
							href="/pages/new"
							class="btn btn-ghost hover:scale-[105%] active:scale-[98%] transition-transform duration-50"
						>
							<Icon src={Plus} class="w-5 h-5" />
						</a>
					</button>

					<button classs="btn">
						<a
							href="/my/dashboard"
							class="btn btn-ghost hover:scale-[105%] active:scale-[98%] transition-transform duration-50"
						>
							<Icon src={RectangleGroup} class="w-5 h-5" />
						</a>
					</button> -->
				</div>
				<div class="dropdown md:dropdown-hover dropdown-end">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabindex="0" class="btn btn-ghost btn-circle avatar">
						<div class="w-10 rounded-full border border-neutral/10">
							<img
								src={data.user?.avatar
									? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
									: `https://ui-avatars.com/api/?name=${data.user?.name}`}
								alt="User avatar"
							/>
						</div>
					</label>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<ul
						tabindex="0"
						class="menu menu-compact border border-neutral/10 dropdown-content p-2 shadow-lg bg-base-100 rounded-box w-52 z-[999]"
					>
						<div class="my-2">
							<li>
								<a href={`/`} class="justify-between">
									<div class="flex gap-2 items-center">
										<div>
											<Icon src={Home} class="w-5 h-5" solid />
										</div>
										<div>Главная</div>
									</div>
								</a>
							</li>

							<li>
								<a href={`/about`} class="justify-between">
									<div class="flex gap-2 items-center">
										<div>
											<Icon src={InformationCircle} class="w-5 h-5" solid />
										</div>
										<div>О сервисе</div>
									</div>
								</a>
							</li>

							<li>
								<a href="/people" class="justify-between">
									<div class="flex gap-2 items-center">
										<div>
											<Icon src={Users} class="w-5 h-5" solid />
										</div>
										<div>Пользователи</div>
									</div>
								</a>
							</li>
						</div>

						<hr class="border border-neutral/25" />

						<div class="my-2">
							<li>
								<a href={`/people/${data.user.id}`} class="justify-between">
									<div class="flex gap-2 items-center">
										<div>
											<Icon src={UserCircle} class="w-5 h-5" solid />
										</div>
										<div>Профиль</div>
									</div>
								</a>
							</li>

							<!-- <li>
								<a href="/my/pages" class="justify-between">
									<div class="flex gap-2 items-center">
										<div>
											<Icon src={RectangleStack} class="w-5 h-5" />
										</div>
										<div>Мои посты</div>
									</div>
								</a>
							</li> -->

							<li>
								<a href="/my/dashboard" class="justify-between">
									<div class="flex gap-2 items-center">
										<div>
											<Icon src={RectangleGroup} class="w-5 h-5" solid />
										</div>
										<div>Статистика</div>
									</div>
								</a>
							</li>
						</div>

						<hr class="border border-neutral/25" />
						<div class="my-2">
							<li>
								<a href="#" class="flex justify-between w-full" on:click|preventDefault>
									<div class="flex gap-2">
										<div>
											<Icon src={ChatBubbleLeftRight} class="w-5 h-5" solid />
										</div>
										<div>Job-AI</div>
									</div>
									<div class="badge badge-success uppercase badge-sm ml-5">soon</div>
								</a>
							</li>

							<li>
								<a href="#" class="flex w-full justify-between" on:click|preventDefault>
									<div class="flex gap-2">
										<div>
											<Icon src={MagnifyingGlassCircle} class="w-5 h-5" solid />
										</div>
										<div>AI Search</div>
									</div>
									<div class="badge badge-success uppercase badge-sm">soon</div>
								</a>
							</li>
						</div>

						<div class="my-2">
							<hr class="border border-neutral/25" />
							<li>
								<a href="/my/settings">
									<div class="flex gap-2 items-center">
										<div>
											<Icon src={Cog6Tooth} class="w-5 h-5" solid />
										</div>
										<div>Настройки</div>
									</div>
								</a>
							</li>
							<li>
								<form action="/logout" method="POST">
									<button type="submit" class="w-full text-start">
										<div class="flex gap-2 items-center">
											<div>
												<Icon src={Power} class="w-5 h-5 font-black" solid />
											</div>
											<div>Выход</div>
										</div>
									</button>
								</form>
							</li>
						</div>
					</ul>
				</div>
			{/if}
		</div>
	</nav>
	<div class="py-4">
		<div class="mx-auto max-w-6xl">
			{#if !isLoaded}
				<div class="scale-150 flex justify-center items-center h-screen w-full">
					<span class="loading loading-dots loading-lg" />
				</div>
			{:else}
				<slot />
			{/if}
		</div>
	</div>
	<Footer />
</div>

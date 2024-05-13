<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Icon, Trash } from 'svelte-hero-icons';
	import { Input, TextArea, WYSIWYG } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	export let data;
	export let form;
	import { fade } from 'svelte/transition';

	let isOpen = false;

	let loading = false;

	const submitUpdatePage = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await update();
			}

			loading = false;
		};
	};

	// Вычисляем разницу в днях между public_at и created
	const daysDifference = Math.round((new Date(data.page.public_at) - new Date(data.page.created)) / (1000 * 60 * 60 * 24));

	// Находим ближайшее значение к daysDifference из списка [0, 30, 60, 180, 10000]
	const closestDay = [0, 30, 60, 180, 10000].reduce((prev, curr) => {
		return (Math.abs(curr - daysDifference) < Math.abs(prev - daysDifference) ? curr : prev);
	});
</script>


<div class="flex flex-col w-full max-w-3xl mx-auto h-full px-4">
	<div class="w-full mt-2">
		<form
			action="?/updatePage"
			method="POST"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance={submitUpdatePage}
		>
			<input type="hidden" name="public_at" value={data.page.public_at} />
			
			<div class="flex flex-col justify-center text-center mt-10 mb-7">
				<div class="text-3xl font-bold">Редактировать</div>
				<div class="text-3xl font-bold">"{data.page.name}"</div>
			</div>

			<div class="w-full grid grid-cols-1 gap-x-5 md:grid-cols-2">
				<div>
					<Input
						id="company"
						label="Компания"
						value={form?.data?.company ?? data.page.company}
						errors={form?.errors?.company}
						placeholder="avito"
					/>
				</div>

				<div>
					<Input
						id="domain"
						label="Область"
						value={form?.data?.domain ?? data.page.domain}
						errors={form?.errors?.domain}
						placeholder="backend"
					/>
				</div>
			</div>

			<div class="w-full grid grid-cols-1 gap-x-5 md:grid-cols-2">
				<div class="w-full">
					<label for="grade" class="label font-medium pb-1">
						<span class="label-text">Grade</span>
					</label>
					<select
						id="grade"
						name="grade"
						label="Grade"
						class="select select-bordered w-full"
					>
						<!-- TODO: Make this dynamic -->
						<option value="intern" selected={form?.data?.grade === 'intern' || data.page.grade === 'intern'}>intern</option>
						<option value="junior" selected={form?.data?.grade === 'junior' || data.page.grade === 'junior'}>junior</option>
						<option value="middle" selected={form?.data?.grade === 'middle' || data.page.grade === 'middle'}>middle</option>
						<option value="senior" selected={form?.data?.grade === 'senior' || data.page.grade === 'senior'}>senior</option>
						<option value="senior+" selected={form?.data?.grade === 'senior+' || data.page.grade === 'senior+'}>senior+</option>
					</select>
					<!-- <span class="text-sm text-red-600">{form?.errors?.grade}</span> -->
				</div>
				<div class="w-full">
					<label for="privacy" class="label font-medium pb-1">
						<span class="label-text">Приватность</span>
					</label>
					<select
						id="privacy"
						name="privacy"
						label="Приватность"
						class="select select-bordered w-full"
					>
						<!-- TODO: Make this dynamic -->
						<option value=0 selected={form?.data?.privacy === 0 || closestDay === 0}>Публичный пост</option>
						<option value=30 selected={form?.data?.privacy === 30 || closestDay === 30}>Публикация: месяц после создания</option>
						<option value=60 selected={form?.data?.privacy === 60 || closestDay === 60}>Публикация: 2 месяца после создания</option>
						<option value=180 selected={form?.data?.privacy === 180 || closestDay === 180}>Публикация: 6 месяцев после создания</option>
						<option value=10000 selected={form?.data?.privacy === 10000 || closestDay === 10000}>Только для меня</option>
					</select>
					<!-- <span class="text-sm text-red-600">{form?.errors?.grade}</span> -->
				</div>
			</div>

			<div class="w-full grid grid-cols-1 gap-x-5">
				<details class="spoiler" bind:open={isOpen}>
				  <summary class="flex items-center justify-between bg-gray-100 p-2 cursor-pointer">
					<div class="flex items-center">
					  <svg
						class="w-4 h-4 text-gray-500 transform transition-transform duration-200"
						class:rotate-90={isOpen}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					  >
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					  </svg>
					  <span class="ml-2 text-sm text-gray-500">Необязательные параметры</span>
					</div>
				  </summary>
				  {#if isOpen}
					<div transition:fade class="w-full grid grid-cols-1 gap-x-5" >
					  <div>
						<Input
						  id="name"
						  label="Название"
						  value={form?.data?.name ?? data.page.name}
						  errors={form?.errors?.name}
						  placeholder="Сложный собес на бэк в Авито"
						/>
					  </div>
					</div>
			  
					<div transition:fade class="w-full grid grid-cols-1 gap-x-5">
					  <div>
						<Input
						  id="tagline"
						  label="Теглайн"
						  value={form?.data?.tagline ?? data.page.tagline}
						  errors={form?.errors?.tagline}
						  placeholder="golang postgresql gRPC kafka k8s"
						/>
					  </div>
					</div>
			  
					<div transition:fade class="w-full grid grid-cols-1 gap-x-5">
					  <div>
						<Input
						  id="url"
						  label="Ссылка на вакансию"
						  value={form?.data?.url ?? data.page.url}
						  errors={form?.errors?.url}
						  placeholder="https://"
						/>
					  </div>
					</div>
				  {/if}
				</details>
			</div>

			<div class="w-full pt-10">
				<WYSIWYG
					type="hidden"
					id="content"
					label="Page Content"
					value={form?.data?.content ?? data.page.content}
					errors={form?.errors?.content}
				/>
			</div>

			<div class="flex gap-2 w-full max-w-md my-5">
				<div class="w-full">
					<a href={`/pages/${data.page.id}`} class="btn btn-outline rounded w-full">Отменить</a>
				</div>
				<div class="w-full">
					<button type="submit" class="btn btn-success rounded w-full">Сохранить изменения</button>
				</div>
			</div>
		</form>
	</div>
</div>

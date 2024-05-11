<script>
	import { enhance } from '$app/forms';
	import { Input, TextArea, WYSIWYG } from '$lib/components';
	import { fade } from 'svelte/transition';

	let isOpen = false;
	export let form;
</script>

<div class="flex flex-col max-w-3xl mx-auto h-full px-4">
	<div class="w-full mt-2">
		<form
			action="?/create"
			method="POST"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance
		>
			<div class="flex flex-col justify-center text-center mt-10 mb-7">
				<div class="text-center text-3xl font-bold">Запись собеседования</div>
			</div>

			<div class="w-full grid grid-cols-1 gap-x-5 md:grid-cols-2">
				<div>
					<Input
						id="company"
						label="Компания"
						value={form?.data?.company}
						errors={form?.errors?.company}
						placeholder="avito"
					/>
				</div>

				<div>
					<Input
						id="domain"
						label="Область"
						value={form?.data?.domain}
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
						<option disabled selected>Выберите грейд</option>
						<option value="intern">intern</option>
						<option value="junior">junior</option>
						<option value="middle">middle</option>
						<option value="senior">senior</option>
						<option value="senior+">senior+</option>
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
						<option value=0>Публичный пост</option>
						<option selected value=30>Опубликовать через 30 дней</option>
						<option value=60>Опубликовать через 60 дней</option>
						<option value=180>Опубликовать через 180 дней</option>
						<option value=10000>Только для меня </option>
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
						  value={form?.data?.name}
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
						  value={form?.data?.tagline}
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
						  value={form?.data?.url}
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
					value={form?.data?.content}
					errors={form?.errors?.content}
				/>
			</div>
			<input type="hidden" name="public_at" value={(new Date()).toISOString()} />
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-accent rounded w-full max-w-lg">Создать страницу</button>
			</div>
		</form>
	</div>
</div>

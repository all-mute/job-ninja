<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Icon, Trash } from 'svelte-hero-icons';
	import { Input, TextArea, WYSIWYG } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	export let data;
	export let form;

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
</script>

<div class="flex flex-col w-full h-full px-4">
	<div class="w-full mt-2">
		<form
			action="?/updatePage"
			method="POST"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance={submitUpdatePage}
		>
			<div class="flex flex-col justify-center text-center mt-10">
				<div class="text-3xl font-bold">Редактировать "{data.page.name}"</div>
				<div class="pt-2 text-lg">Измените, что угодно, а затем нажмите "сохранить изменения"</div>
			</div>

			<div class="w-full grid grid-cols-1 gap-x-5 md:grid-cols-3">
				<div>
					<Input
						id="name"
						label="Название*"
						value={form?.data?.name ?? data.page.name}
						errors={form?.errors?.name}
						placeholder="Сложный собес на бэк в Авито"
					/>
				</div>

				<div>
					<Input
						id="company"
						label="Компания*"
						value={form?.data?.company ?? data.page.company}
						errors={form?.errors?.company}
						placeholder="avito"
					/>
				</div>

				<div>
					<Input
						id="domain"
						label="Домен*"
						value={form?.data?.domain ?? data.page.domain}
						errors={form?.errors?.domain}
						placeholder="backend"
					/>
				</div>

				<div class="w-full">
					<label for="grade" class="label font-medium pb-1">
						<span class="label-text">Grade*</span>
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
				
				<div>
					<Input
						id="tagline"
						label="Какие угодно теги"
						value={form?.data?.tagline ?? data.page.tagline}
						errors={form?.errors?.tagline}
						placeholder="golang"
					/>
				</div>

				<div>
					<Input
						id="url"
						label="Ссылка на вакансию, если есть"
						value={form?.data?.url ?? data.page.url}
						errors={form?.errors?.url}
						placeholder="https://"
					/>
				</div>

				
			</div>

			<div class="flex items-center">
				<label for="private" class="flex items-center mr-2">
					<input
						type="checkbox"
						id="private"
						name="private"
						class="form-checkbox"
						checked={form?.data?.private ?? data.page.private}
					/>
					<span class="ml-2 text-sm">Private</span>
				</label>
			</div>

			
			  
			  

			<div class="w-full pt-2">
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

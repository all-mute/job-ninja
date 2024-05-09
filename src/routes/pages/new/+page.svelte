<script>
	import { enhance } from '$app/forms';
	import { Input, TextArea, WYSIWYG } from '$lib/components';
	export let form;
</script>

<div class="flex flex-col max-w-xl mx-auto h-full px-4">
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

			<div class="w-full grid grid-cols-1 gap-x-5 ">
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

			<div class="w-full grid grid-cols-1 gap-x-5">
				<div>
					<Input
						id="tagline"
						label="Теги (любые)"
						value={form?.data?.tagline}
						errors={form?.errors?.tagline}
						placeholder="golang postgresql gRPC kafka k8s"
					/>
				</div>
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
						<span class="label-text">Grade*</span>
					</label>
					<select
						id="grade"
						name="grade"
						label="Grade"
						class="select select-bordered w-full"
					>
						<!-- TODO: Make this dynamic -->
						<option disabled selected>Select Grade</option>
						<option value="intern">intern</option>
						<option value="junior">junior</option>
						<option value="middle">middle</option>
						<option value="senior">senior</option>
						<option value="senior+">senior+</option>
					</select>
					<!-- <span class="text-sm text-red-600">{form?.errors?.grade}</span> -->
				</div>
				<div class="w-full flex items-center justify-center pt-7 form-control">
					<label for="private" class="label cursor-pointer flex items-center mr-2">
						<input
							type="checkbox"
							id="private"
							name="private"
							class="form-checkbox checkbox checkbox-primary"
							checked={form?.data?.private}
						/>
						<span class="label-text ml-2 text-sm font-semibold">Скрыть пост</span>
					</label>
				</div>
			</div>

			<div class="w-full grid grid-cols-1 gap-x-5">
				<div>
					<Input
						id="url"
						label="Ссылка на вакансию (при наличии)"
						value={form?.data?.url}
						errors={form?.errors?.url}
						placeholder="https://"
					/>
				</div>

				
			</div>


			<div class="w-full">
				<WYSIWYG
					type="hidden"
					id="content"
					label="Page Content"
					value={form?.data?.content}
					errors={form?.errors?.content}
				/>
			</div>
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-success rounded w-full max-w-lg">Создать страницу</button>
			</div>
		</form>
	</div>
</div>

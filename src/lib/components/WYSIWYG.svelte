<script>
	import { onMount } from 'svelte';
  
	export let value = '';
	export let placeholder = '';
	export let id;
	export let label;
	export let type = 'hidden';
	export let disabled = false;
	export let required = false;
	export let errors;
  
	let editor;
	
	let content = value;
  
	onMount(async () => {
	  const Quill = (await import('quill')).default;
	  import('quill/dist/quill.snow.css');
  
	  editor = new Quill(`#${id}`, {
		theme: 'snow',
		modules: {
		  toolbar: [
			[{ header: [1, 2, false] }],
			['bold', 'italic', 'underline', 'strike'],
			['code-block'],
			['link', 'image', 'video'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ align: [] }],
			['clean'],
		  ],
		},
		placeholder,
	  });
  
	  editor.on('text-change', () => {
		content = editor.root.innerHTML;
		value = content; 
	  });

	  editor.root.innerHTML = content;
	});
  </script>
  
  <div class="form-control w-full">
	<label for={id} class="label font-medium pb-1">
	  <span class="label-text">{label}</span>
	</label>
  
	<div id={id} class="quill-editor h-full min-h-[400px]"></div>
  
	<input
	  type='hidden'
	  {placeholder}
	  {required}
	  {disabled}
	  {id}
	  name={id}
	  bind:value={content}
	  class="hidden"
	/>
  
	{#if errors}
	  {#each errors as error}
		<label for={id} class="label py-0 pt-1">
		  <span class="label-text-alt text-error">{error}</span>
		</label>
	  {/each}
	{/if}
  </div>
  
  <style>
	.quill-editor {
	  min-height: 400px;
	}
  </style>
  
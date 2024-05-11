<script>
    import { onMount } from 'svelte';
    let editor;
    let content = '';
  
    onMount(async () => {
      // Динамически импортируем Quill только на клиенте
      const Quill = (await import('quill')).default;
      import('quill/dist/quill.snow.css');
  
      editor = new Quill('#editor', {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block'],
          ],
        },
      });
  
      editor.on('text-change', () => {
        content = editor.root.innerHTML;
      });
    });
  
    const handleSubmit = () => {
      console.log('Content:', content);
    };
  </script>
  
  <div id="editor"></div>
  <button on:click={handleSubmit}>Submit</button>
  
  <style>
    #editor {
      height: 300px;
    }
  </style>
  
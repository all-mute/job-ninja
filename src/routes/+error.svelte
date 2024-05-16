<script>
	import { page } from '$app/stores';
	import { emojis } from '$lib/emojis.js';
</script>

<h1>Error: {$page.status} {$page.error.message}</h1>
<span style="font-size: 2em">
	Сайт совсем свежий.. <br />
	Если что-то действительно сломалось, большая просьба написать tg @nonGilgamesh, мы выдать вам миска рис
</span>
<span style="font-size: 5em">
	{emojis[$page.status] ?? emojis[500]}
</span>
<script>
	import { page } from '$app/stores';
	import { emojis } from './emojis.js';
</script>

<h1>Error: {$page.status} {$page.error.message}</h1>
<span style="font-size: 3em">
	Ты просишь без уважения...
</span>
<span style="font-size: 3em">
	{emojis[$page.status] ?? emojis[500]}
</span>
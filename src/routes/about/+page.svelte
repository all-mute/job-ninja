<script>
	import { githubOurURL } from '../../lib/store';
	import FeatureCard from '$lib/components/FeatureCard.svelte';

	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineGithub from 'svelte-icons-pack/ai/AiOutlineGithub';
	import FaRobot from 'svelte-icons-pack/fa/FaSolidRobot';
	import BsCardList from 'svelte-icons-pack/bs/BsCardList';
	import AiOutlineSearch from 'svelte-icons-pack/ai/AiOutlineSearch';
	import AiOutlineApi from 'svelte-icons-pack/ai/AiOutlineApi';
	import AiFillDatabase from 'svelte-icons-pack/ai/AiFillDatabase';
	import SiSvelte from 'svelte-icons-pack/si/SiSvelte';
	import SiOpenai from 'svelte-icons-pack/si/SiOpenai';
	import SiTailwindcss from 'svelte-icons-pack/si/SiTailwindcss';
	import BiNetworkChart from 'svelte-icons-pack/bi/BiNetworkChart';
	import BiUserCircle from 'svelte-icons-pack/bi/BiUserCircle';
	import SiVercel from 'svelte-icons-pack/si/SiVercel';

	import homepage from '$lib/assets/homepage.png';
	import quantumComputing from '$lib/assets/quantum-computing.png';
</script>

<div>
	<div class="hero mb-20">
		<div class="hero-content flex w-full flex-col items-center justify-between lg:flex-row-reverse">
			<img
				src="https://cdn.discordapp.com/attachments/1008571063732539392/1115921630120656957/engage_intellect_cyberpunk_graph_network_on_a_white_background_5b873da3-eb66-4c8a-b8dd-6dad314f3238.png"
				class="object-cover max-w-0 lg:max-w-lg"
				alt="hero"
			/>
			<div class="max-w-lg">
				<div class="text-5xl md:text-6xl lg:text-7xl font-bold">Делитесь вопросами с собеседований</div>
				<div class="text-xl lg:text-2xl py-6">
					Сообщество, управляемое пользователями, по обмену вопросами с собесов. Волки хай.
				</div>

				<div class="flex items-center gap-2">
					<a
						href="/register"
						class="btn btn-primary border-opacity-0 hover:border-opacity-0 bg-orange-500 hover:bg-orange-300 rounded"
						>Начать</a
					>
					<a href={$githubOurURL} class="btn btn-outline group rounded">
						<div class="flex gap-1 items-center">
							<div
								class="group-hover:fill-orange-500 fill-orange-500 transition-color duration-200"
							>
								<Icon src={AiOutlineGithub} size="20" />
							</div>
							<div class="">Гитхаб</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>

	
</div>

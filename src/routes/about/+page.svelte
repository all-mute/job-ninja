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

	import feed from '$lib/assets/feed-screenshot.png';
	import quantumComputing from '$lib/assets/quantum-computing.png';
</script>

<div>
	<div class="hero mb-20">
		<div class="hero-content flex w-full flex-col items-center justify-between lg:flex-row-reverse">
			<img
				src={feed}
				class="object-cover max-w-0 lg:max-w-lg"
				alt="feed"
			/>
			<div class="max-w-lg">
				<div class="text-5xl md:text-6xl lg:text-6xl font-bold">Все собеседования в одном месте</div>
				<div class="text-xl lg:text-2xl py-6">
					Записывайте вопросы с собеседований в одном месте, чтобы не терять. <br />
					Находите последние вопросы 
					<span class="font-bold"
				> в свою компанию+позицию 
				</span>
				 среди постов других участников.
					<div class=""></div>
				</div>

				<div class="flex items-center gap-2">
					<a
						href="/register"
						class="btn btn-primary bg-purple-500 border-purple-500 hover:bg-purple-700 rounded"
						>Начать</a
					>
					<a href={$githubOurURL} class="btn btn-outline group rounded">
						<div class="flex gap-1 items-center">
							<div
								class="group-hover:fill-purple-500 fill-purple-500 transition-color duration-200"
							>
								<Icon src={AiOutlineGithub} size="20" />
							</div>
							<div class="">Помочь проекту</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>

	<div class="divider" />

	<div class="px-4 my-20 max-w-5xl text-center mx-auto flex flex-col items-center group">
		<div>
			<div class="text-4xl font-bold flex justify-center">Интуитивное добавление</div>

			<div class="my-5 text-lg">
				Используйте наш сайт как универсальное место, в котором можно сохранять любую информацию о
				своих последних собеседованиях.
				<span class="font-bold"
				> Первые 100 участников, разместивших посты, получают специальное достижение. 
				</span>
				Также среди самых популярных постов будет проведен розыгрыш трех миска рис.
			</div>
		</div>
		<div class="relative">
			<img
				src={feed}
				alt="hello"
				class="max-3xl lg:max-w-6xl shadow-lg border border-neutral/50"
			/>
		</div>
	</div>

	<div class="px-4 my-20 max-w-5xl text-center mx-auto flex flex-col items-center">
		<div>
			<div class="text-4xl font-bold flex justify-center">Безопасность и приватность</div>

			<div class="my-5 text-lg">
				Записи можно сохранять публично и приватно, а также с отложенной публикацией. Приватные записи видны только вам и никогда не попадут в поисковую выдачу. Мы гарантируем конфиденциальность ваших персональных данных.
			</div>
		</div>
		<img
			src={quantumComputing}
			alt="hello"
			class="max-3xl lg:max-w-6xl shadow-lg border border-neutral/50"
		/>
	</div>

	<div class="px-4 my-20 max-w-5xl text-center mx-auto flex flex-col items-center">
		<div>
			<div class="text-4xl font-bold flex justify-center">
				Удобный поиск
			</div>

			<div class="my-5 text-lg">
				Ищите собеседования на свою позицию, используя фильтр, встроенный в поиск. Разработано программистами и для программистов.
			</div>
		</div>
		<img
			src={feed}
			alt="hello"
			class="max-3xl lg:max-w-6xl shadow-lg border border-neutral/50"
		/>
	</div>

	<div class="my-40">
		<div class="my-40">
			<div class="px-4 my-10 max-w-5xl text-center mx-auto flex flex-col items-center">
				<div>
					<div class="text-4xl font-bold flex justify-center">Еще фичи</div>

					<div class="my-5 text-lg">Дополнительные возможности, которые могут вам пригодиться</div>
				</div>
			</div>

			<div
				class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 w-full gap-2 md:gap-5 px-4 md:px-0"
			>
				<FeatureCard
					title="Open Source"
					description="Разработано в опенсурсе и используя опенсурсные технологии."
					button="click me"
					><div class="fill-teal-500 text-teal-500">
						<Icon src={AiOutlineGithub} size="24" />
					</div></FeatureCard
				>

				<FeatureCard
					title="Планы на будущее"
					description="Большое количество AI-фичей в ближайшее время."
					button="click me"
					><div class="fill-teal-500 text-teal-500">
						<Icon src={FaRobot} size="24" />
					</div></FeatureCard
				>

				<FeatureCard
					title="Редактируемый профиль"
					description="Личный кабинет и случайная мемная аватарка на старте."
					button="click me"
					><div class="fill-teal-500 text-teal-500">
						<Icon src={BsCardList} size="24" />
					</div></FeatureCard
				>

				<FeatureCard
					title="Дополнительные поля для постов"
					description="Для более удобной ориентации по записям."
					button="click me"
					><div class="fill-teal-500 text-teal-500">
						<Icon src={AiOutlineSearch} size="24" />
					</div></FeatureCard
				>
				<FeatureCard
					title="Лайки, подписки, избранное..."
					description="Всё для вас."
					button="click me"
					><div class="fill-teal-500 text-teal-500">
						<Icon src={AiOutlineApi} size="24" />
					</div></FeatureCard
				>

				<FeatureCard
					title="Удобный редактор"
					description="Quill - html редактор"
					button="click me"
					><div class="fill-teal-500 text-teal-500">
						<Icon src={AiFillDatabase} size="24" />
					</div></FeatureCard
				>

				<FeatureCard
					title="Достижения"
					description="Необычная система ачивок."
					button="click me"
					><div class="fill-teal-500 text-teal-500">
						<Icon src={BiNetworkChart} size="24" />
					</div></FeatureCard
				>

				<FeatureCard
					title="Полная свобода"
					description="Мы не сдерживаем вас строгим форматом постов."
					button="click me"
					><div class="fill-teal-500 text-teal-500">
						<Icon src={BiUserCircle} size="24" />
					</div></FeatureCard
				>
			</div>
		</div>
	</div>

	<div class="my-10 bg-base-200 py-10 rounded shadow-lg">
		<div class="hero min-h-full rounded">
			<div class="hero-content flex-col lg:flex-row xl:gap-32">
				<img
					alt="hero"
					src="https://images.unsplash.com/photo-1586543354240-2187898bb2e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGNvbGxhYm9yYXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
					class="h-80 w-full object-cover rounded shadow-lg"
				/>
				<div class="text-center max-w-lg">
					<div class="text-3xl font-bold">Ассистент для собесов (Скоро)</div>
					<div class="py-5">
						AI-инструмент для помощи в прохождении собесов в режиме реального времени. Будет помогать как с техническими вопросами, так и с кейсами.
					</div>
					<!-- <button class="btn btn-primary w-full">Get Started</button> -->
				</div>
			</div>
		</div>

		<div class="hero min-h-full rounded">
			<div class="hero-content flex-col lg:flex-row-reverse xl:gap-32">
				<img
					alt="hero"
					src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGFib3JhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
					class="h-80 w-full object-cover rounded shadow-lg"
				/>
				<div class="text-center max-w-lg">
					<div class="text-3xl font-bold">Популярность вопросов относительно компаний/позиций/ролей (Скоро)</div>
					<div class="py-5">
						Рейтинг вопросов относительно компаний/позиций/ролей с вероятностью появления за определенный период.
					</div>
					<!-- <button class="btn btn-primary w-full">Get Started</button> -->
				</div>
			</div>
		</div>

		<div class="hero min-h-full rounded">
			<div class="hero-content flex-col lg:flex-row xl:gap-32">
				<img
					alt="hero"
					src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
					class="h-80 w-full object-cover rounded shadow-lg"
				/>
				<div class="text-center max-w-lg">
					<div class="text-3xl font-bold">AI-поиск по вопросам сайта (Скоро)</div>
					<div class="py-5">
						Семантический поиск по вопросам, аналогичный you.com.
					</div>
					<!-- <button class="btn btn-primary w-full">Get Started</button> -->
				</div>
			</div>
		</div>

		<div class="hero min-h-full rounded">
			<div class="hero-content flex-col lg:flex-row xl:gap-32">
				<img
					alt="hero"
					src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
					class="h-80 w-full object-cover rounded shadow-lg"
				/>
				<div class="text-center max-w-lg">
					<div class="text-3xl font-bold">Ассистент для подготовки к собесам (Скоро)</div>
					<div class="py-5">
						AI-тренер, который помежет вам подготовится к актуальным вопросам с собеседований.
						Будет спрашивать уточняющие вопросы и моделировать кейсы.
					</div>
					<!-- <button class="btn btn-primary w-full">Get Started</button> -->
				</div>
			</div>
		</div>

		<div class="hero min-h-full rounded">
			<div class="hero-content flex-col lg:flex-row-reverse xl:gap-32">
				<img
					alt="hero"
					src="https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80"
					class="h-80 w-full object-cover rounded shadow-lg"
				/>
				<div class="text-center max-w-lg">
					<div class="text-3xl font-bold">Внешняя библиотека вопросов (Скоро)</div>
					<div class="py-5">
						Украдем функционал easyoffer.ru.
					</div>
					<!-- <button class="btn btn-primary w-full">Get Started</button> -->
				</div>
			</div>
		</div>

		<div class="hero min-h-full rounded">
			<div class="hero-content flex-col lg:flex-row-reverse xl:gap-32">
				<img
					alt="hero"
					src="https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80"
					class="h-80 w-full object-cover rounded shadow-lg"
				/>
				<div class="text-center max-w-lg">
					<div class="text-3xl font-bold">Генерация индивидуальной программы по подготовке к собесам (Не скоро)</div>
					<div class="py-5">
						Сформированный под вас упорядоченный список вопросов для оптимального ботанья.
					</div>
					<!-- <button class="btn btn-primary w-full">Get Started</button> -->
				</div>
			</div>
		</div>
	</div>
	<div class="my-20">
		<div class="flex items-center justify-center px-4">
			<div
				class="flex flex-col justify-center gap-2 max-w-3xl border border-neutral/50 p-10 rounded shadow-lg w-full items-center"
			>
				<div class="max-w-lg">
					<div class="text-4xl flex justify-center font-bold my-5">Написать нам</div>
					<div class="text-xl">
						Есть вопрос? Хотите узнать больше? Напишите нам, и мы ответим вам как можно скорее.
					</div>
					<a
						href="https://t.me/nonGilgamesh"
						target="_blank"
						class="btn btn-primary rounded w-full my-5">Телеграм</a
					>
				</div>
			</div>
		</div>
	</div>
</div>

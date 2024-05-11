/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	daisyui: {
		themes: [ 
			{
				lightOrange: {
					"primary": "#f97316",
					"secondary": "#FFD4C5",
					"accent": "#fc9652",
					"neutral": "#0f0501",
					"base-100": "#ffffff",
					"info": "#60a5fa",
					"success": "#4ade80",
					"warning": "#f87171",
					"error": "#ef4444",
				},
			},
			'light',
			'dark',
			'cupcake',
			'bumblebee',
			'emerald',
			'corporate',
			'synthwave',
			'retro',
			'cyberpunk',
			'valentine',
			'halloween',
			'garden',
			'forest',
			'aqua',
			'lofi',
			'pastel',
			'fantasy',
			'wireframe',
			'black',
			'luxury',
			'dracula',
			'cmyk',
			'autumn',
			'business',
			'acid',
			'lemonade',
			'night',
			'coffee',
			'winter'
		]
	},

	plugins: [require('daisyui')]
};

module.exports = config;

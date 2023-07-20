/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens : {
			'xs': '350px',
			'sm': '600px',
			'md': '900px',
		},
		extend: {
			colors: {
				'lmn-slate': '#161616',
				'lmn-blue': '#34a3e0',
				'lmn-pink': '#f081b7',
				'lmn-yellow': '#fedc3e',
				'lmn-green': '#4ec67c',
				'lmn-blood': '#197cb3',
				'lmn-red': '#f1392a',
				'lmn-white': '#f3f1f2',
				'lmn-white-shade': '#dcdadc',
				'blue-white': '#e8e8f8',
				'blue-white-mid': '#d8d8e8',
				'blue-white-shade': '#d0d0e0',
			},
		},
	},
	plugins: [],
}

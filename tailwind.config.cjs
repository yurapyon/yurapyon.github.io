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
				'lmn-red': '#f03324',
				// 'lmn-red': '#f74f41',
			},
		},
	},
	plugins: [],
}

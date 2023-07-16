/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'lmn-slate': '#161616',
				'lmn-blue': '#34a3e0',
				'lmn-pink': '#f081b7',
				'lmn-yellow': '#fedc3e',
				'lmn-green': '#4ec67c',
				'lmn-blood': '#197cb3',
				'lmn-red': '#f03324',
			},
		},
	},
	plugins: [],
}

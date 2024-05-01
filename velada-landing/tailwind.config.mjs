import animations from '@jose-sissa-3s/tailwind-animations'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary': '#333',
				'secondary': '#DDD'
			}
		},
	},
	plugins: [animations],
}

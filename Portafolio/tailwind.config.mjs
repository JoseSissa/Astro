/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				yellowOne: '#fff200',
				yellowTwo: '#fff773',
				background: 'var(--background)',
				backgroundTwo: 'var(--background-two)',
				colorPrimary: 'var(--color-primary)'
			}
		}
	},
	plugins: [],
}

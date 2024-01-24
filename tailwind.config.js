/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(var(--color-primary) / <alpha-value>)',
				light: 'rgb(var(--color-light-text) / <alpha-value>)',
				dark: 'rgb(var(--color-dark-text) / <alpha-value>)',
				'dark-muted': 'rgb(var(--color-dark-muted-text) / <alpha-value>)',
				'light-muted': 'rgb(var(--color-light-muted-text) / <alpha-value>)',
				ring: 'rgb(var(--color-ring) / <alpha-value>)',
				'dark-border': 'rgb(var(--color-dark-border) / <alpha-value>)',
				'light-border': 'rgb(var(--color-light-border) / <alpha-value>)',
				'nav-selected': 'rgb(var(--color-nav-selected) / <alpha-value>)',
				'dark-post': 'rgb(var(--color-dark-post) / <alpha-value>)',
			},
		},

		fontFamily: {
			'DM-Sans': '"DM Sans", sans-serif',
			Inter: '"Inter", sans-serif',
			Poppins: '"Poppins", sans-serif',
		},
	},
	plugins: [],
};

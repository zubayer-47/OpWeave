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
				border: 'rgb(var(--color-border) / <alpha-value>)',
				'nav-selected': 'rgb(var(--color-nav-selected) / <alpha-value>)',
			},
		},

		fontFamily: {
			'DM-Sans': '"DM Sans"',
			Inter: '"Inter"',
			Poppins: '"Poppins"',
		},
	},
	plugins: [],
};

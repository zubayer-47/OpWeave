/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(var(--color-primary) / <alpha-value>)',
				secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
				light: 'rgb(var(--color-light-text) / <alpha-value>)',
				dark: 'rgb(var(--color-dark-text) / <alpha-value>)',
				'dark-muted': 'rgb(var(--color-dark-muted-text) / <alpha-value>)',
				'light-muted': 'rgb(var(--color-light-muted-text) / <alpha-value>)',
				ring: 'rgb(var(--color-ring) / <alpha-value>)',
				'dark-border': 'rgb(var(--color-dark-border) / <alpha-value>)',
				'light-border': 'rgb(var(--color-light-border) / <alpha-value>)',
				'nav-selected': 'rgb(var(--color-nav-selected) / <alpha-value>)',
				'dark-post': 'rgb(var(--color-dark-post) / <alpha-value>)',
				lighten: 'rgb(var(--color-lighten) / <alpha-value>)',
				subModal: 'rgb(var(--color-sub-modal) / <alpha-value>)',
				cRed: 'rgb(var(--color-red) / <alpha-value>)',

				overlay: 'rgb(var(--color-overlay)',
			},
			spacing: {
				100: '28rem',
				102: '46rem',
			},
			boxShadow: {
				'3xl': '0px 5px 24.4px -19px #F8FAFC',
				// 'sub-modal': '0px 2px 24px -15px #F8FAFC',
				'sub-modal': '0px 4px 10px 4px #262F40',
			},
			keyframes: {
				'navlink-open': {
					'0%, 100%': { transform: 'rotate(-2deg)' },
					'50%': { transform: 'rotate(3deg)' },
				},
				'auth-switch': {
					'0%': {
						transform: 'translateX(20%)',
						transition: 'all .4s',
					},
					// '20%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(0%)' },
				},
				// 'auth-switch': {
				// 	'0%': { transform: 'scale(1)' },
				// 	'20%': { transform: 'scale(.7)' },
				// 	// '50%': { transform: 'scale(.5)' },
				// 	'100%': { transform: 'scale(1)' },
				// },
			},
			animation: {
				'navlink-open': 'navlink-open 1s ease-in-out forwards',
				'auth-switch': 'auth-switch .5s ease-in-out forwards',
			},
		},

		fontFamily: {
			'DM-Sans': '"DM Sans", sans-serif',
			Inter: '"Inter", sans-serif',
			Poppins: '"Poppins", sans-serif',
		},
	},
	plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};

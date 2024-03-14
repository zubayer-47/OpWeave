/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				// dark: {
				// 	bg: 'rgb(var(--color-dark-primary) / <alpha-value>)',
				// 	text: 'rgb(var(--color-dark-text) / <alpha-value>)',
				// 	secondary: 'rgb(var(--color-dark-secondary) / <alpha-value>)',
				// 	muted: 'rgb(var(--color-dark-muted-text) / <alpha-value>)',
				// 	border: 'rgb(var(--color-dark-border) / <alpha-value>)',
				// 	post: 'rgb(var(--color-dark-post) / <alpha-value>)',
				// 	subModal: 'rgb(var(--color-sub-modal) / <alpha-value>)',
				// },

				// light: {
				// 	text: 'rgb(var(--color-light-text) / <alpha-value>)',
				// 	bg: 'rgb(var(--color-light-primary) / <alpha-value>)',
				// 	border: 'rgb(var(--color-light-border) / <alpha-value>)',
				// 	muted: 'rgb(var(--color-light-muted-text) / <alpha-value>)',
				// 	modal: 'rgb(var(--color-light-modal) / <alpha-value>)',
				// },

				// dark
				dark: {
					primary: 'rgb(var(--color-primary-dark) / <alpha-value>)',
					hover: 'rgb(var(--color-primary-dark-hover) / <alpha-value>)',
					active: 'rgb(var(--color-primary-dark-active) / <alpha-value>)',
					border: 'rgb(var(--color-primary-dark-border) / <alpha-value>)',
					muted: 'rgb(var(--color-primary-dark-muted) / <alpha-value>)',
				},

				// light
				light: {
					primary: 'rgb(var(--color-light) / <alpha-value>)',
					lighter: 'rgb(var(--color-primary-lighter) / <alpha-value>)',
					hover: 'rgb(var(--color-primary-light-hover) / <alpha-value>)',
					active: 'rgb(var(--color-primary-light-active) / <alpha-value>)',
				},

				// normal
				normal: {
					primary: 'rgb(var(--color-primary-normal) / <alpha-value>)',
					hover: 'rgb(var(--color-primary-normal-hover) / <alpha-value>)',
					active: 'rgb(var(--color-primary-normal-active) / <alpha-value>)',
				},

				red: 'rgb(var(--color-red) / <alpha-value>)',

				blue: {
					primary: 'rgb(var(--color-blue) / <alpha-value>)',
					secondary: 'rgb(var(--color-blue-secondary) / <alpha-value>)',
				},
				'nav-selected': 'rgb(var(--color-nav-selected) / <alpha-value>)',

				// others
				// ring: 'rgb(var(--color-ring) / <alpha-value>)',
				// 'nav-selected': 'rgb(var(--color-nav-selected) / <alpha-value>)',
				// lighten: 'rgb(var(--color-lighten) / <alpha-value>)',
				// cRed: 'rgb(var(--color-red) / <alpha-value>)',
				// overlay: 'rgb(var(--color-overlay)',
			},
			spacing: {
				100: '28rem',
				102: '46rem',
			},
			boxShadow: {
				nav: '0px 5px 24.4px -19px #F8FAFC',
				auth: '0px 4px 10px 4px #262F40',
			},
			keyframes: {
				'navlink-open': {
					'0%, 100%': { transform: 'rotate(-2deg)' },
					'50%': { transform: 'rotate(3deg)' },
				},
				'auth-switch': {
					'0%': {
						transform: 'translateX(0%)',
						// transition: 'all .4s',
					},
					'20%': { transform: 'translateX(1%)' },
					'100%': { transform: 'translateX(0%)' },
				},
				'submodal-open': {
					'0%': {
						right: '-20%',
						// transition: 'all .4s',
					},
					'80%': { right: '4.5rem' },
					'100%': { right: '3rem' },
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
				'submodal-open': 'submodal-open .4s ease-in-out forwards',
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

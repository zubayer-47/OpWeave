/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: 'hsl(var(--card))',
				cardForeground: 'hsl(var(--card-foreground))',
				popover: 'hsl(var(--popover))',
				popoverForeground: 'hsl(var(--popover-foreground))',
				primary: 'hsl(var(--primary))',
				primaryForeground: 'hsl(var(--primary-foreground))',
				secondary: 'hsl(var(--secondary))',
				secondaryForeground: 'hsl(var(--secondary-foreground))',
				muted: 'hsl(var(--muted))',
				accent: 'hsl(var(--accent))',
				accentForeground: 'hsl(var(--accent-foreground))',
				destructive: 'hsl(var(--destructive))',
				destructiveForeground: 'hsl(var(--destructive-foreground))',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				radius: 'hsl(var(--radius))',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};

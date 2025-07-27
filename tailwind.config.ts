import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				/* Organic Color Extensions */
				sage: {
					DEFAULT: 'hsl(var(--primary))',
					hover: 'hsl(var(--sage-hover))',
					light: 'hsl(90 15% 76%)',
					dark: 'hsl(90 15% 48%)'
				},
				cream: {
					DEFAULT: 'hsl(var(--background))',
					warm: 'hsl(48 25% 95%)',
					soft: 'hsl(48 15% 92%)'
				},
				mint: {
					DEFAULT: 'hsl(var(--secondary))',
					light: 'hsl(48 25% 92%)',
					soft: 'hsl(48 15% 85%)'
				},
				forest: {
					DEFAULT: 'hsl(var(--foreground))',
					light: 'hsl(145 25% 35%)',
					dark: 'hsl(145 35% 15%)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				/* Organic Animation Keyframes */
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'grow': {
					'0%': { 
						transform: 'scale(0.8) translateY(20px)', 
						opacity: '0'
					},
					'100%': { 
						transform: 'scale(1) translateY(0px)', 
						opacity: '1'
					}
				},
				'breathe': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'drift': {
					'0%': { transform: 'translateX(-100px)' },
					'100%': { transform: 'translateX(calc(100vw + 100px))' }
				},
				'typewriter': {
					'0%': { width: '0' },
					'100%': { width: '100%' }
				},
				'draw-line': {
					'0%': { width: '0' },
					'100%': { width: '100%' }
				},
				'organic-entrance': {
					'0%': { 
						transform: 'scale(0.6) rotate(-5deg)',
						opacity: '0'
					},
					'50%': {
						transform: 'scale(1.1) rotate(2deg)'
					},
					'100%': { 
						transform: 'scale(1) rotate(0deg)',
						opacity: '1'
					}
				},
				'leaf-fall': {
					'0%': {
						transform: 'translateY(-100px) rotate(0deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(100vh) rotate(360deg)',
						opacity: '0'
					}
				},
				'ripple': {
					'0%': {
						transform: 'scale(0)',
						opacity: '1'
					},
					'100%': {
						transform: 'scale(4)',
						opacity: '0'
					}
				},
				'pulse-gentle': {
					'0%, 100%': { 
						transform: 'scale(1)',
						opacity: '1'
					},
					'50%': { 
						transform: 'scale(1.02)',
						opacity: '0.9'
					}
				},
				'slide-up-fade': {
					'0%': {
						transform: 'translateY(40px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				/* Organic Animations */
				'float': 'float 6s ease-in-out infinite',
				'grow': 'grow 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'breathe': 'breathe 4s ease-in-out infinite',
				'drift': 'drift 20s linear infinite',
				'typewriter': 'typewriter 3s steps(30) forwards',
				'draw-line': 'draw-line 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
				'organic-entrance': 'organic-entrance 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
				'leaf-fall': 'leaf-fall 8s linear infinite',
				'ripple': 'ripple 0.6s ease-out',
				'pulse-gentle': 'pulse-gentle 3s ease-in-out infinite',
				'slide-up-fade': 'slide-up-fade 0.6s ease-out forwards'
			},
			/* Additional Extensions */
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem'
			},
			typography: {
				DEFAULT: {
					css: {
						color: 'hsl(var(--foreground))',
						'[class~="lead"]': {
							color: 'hsl(var(--muted-foreground))'
						}
					}
				}
			},
			transitionTimingFunction: {
				'organic': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce-soft': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'natural': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

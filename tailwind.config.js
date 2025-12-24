/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
  			gold: {
  				DEFAULT: 'hsl(var(--gold))',
  				foreground: 'hsl(var(--gold-foreground))'
  			},
  			platinum: {
  				DEFAULT: 'hsl(var(--platinum))',
  				foreground: 'hsl(var(--platinum-foreground))'
  			},
  			success: {
  				DEFAULT: 'hsl(var(--success))',
  				foreground: 'hsl(var(--success-foreground))'
  			},
  			warning: {
  				DEFAULT: 'hsl(var(--warning))',
  				foreground: 'hsl(var(--warning-foreground))'
  			},
  			info: {
  				DEFAULT: 'hsl(var(--info))',
  				foreground: 'hsl(var(--info-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			none: 'var(--radius-none)',
  			DEFAULT: 'var(--radius-base)',
  			xl: 'var(--radius-xl)',
  			'2xl': 'var(--radius-2xl)',
  			'3xl': 'var(--radius-3xl)',
  			full: 'var(--radius-full)'
  		},
  		spacing: {
  			'1': 'var(--space-1)',
  			'2': 'var(--space-2)',
  			'3': 'var(--space-3)',
  			'4': 'var(--space-4)',
  			'5': 'var(--space-5)',
  			'6': 'var(--space-6)',
  			'8': 'var(--space-8)',
  			'10': 'var(--space-10)',
  			'12': 'var(--space-12)',
  			'16': 'var(--space-16)',
  			'20': 'var(--space-20)',
  			'24': 'var(--space-24)',
  			'32': 'var(--space-32)'
  		},
  		fontSize: {
  			xs: 'var(--text-xs)',
  			sm: 'var(--text-sm)',
  			base: 'var(--text-base)',
  			lg: 'var(--text-lg)',
  			xl: 'var(--text-xl)',
  			'2xl': 'var(--text-2xl)',
  			'3xl': 'var(--text-3xl)',
  			'4xl': 'var(--text-4xl)',
  			'5xl': 'var(--text-5xl)',
  			'6xl': 'var(--text-6xl)',
  			'7xl': 'var(--text-7xl)'
  		},
  		fontWeight: {
  			light: 'var(--font-weight-light)',
  			normal: 'var(--font-weight-normal)',
  			medium: 'var(--font-weight-medium)',
  			semibold: 'var(--font-weight-semibold)',
  			bold: 'var(--font-weight-bold)',
  			extrabold: 'var(--font-weight-extrabold)',
  			black: 'var(--font-weight-black)'
  		},
  		boxShadow: {
  			xs: 'var(--shadow-xs)',
  			sm: 'var(--shadow-sm)',
  			md: 'var(--shadow-md)',
  			lg: 'var(--shadow-lg)',
  			xl: 'var(--shadow-xl)',
  			'2xl': 'var(--shadow-2xl)',
  			inner: 'var(--shadow-inner)'
  		},
  		transitionDuration: {
  			fast: 'var(--duration-fast)',
  			normal: 'var(--duration-normal)',
  			slow: 'var(--duration-slow)'
  		},
  		transitionTimingFunction: {
  			'ease-in': 'var(--ease-in)',
  			'ease-out': 'var(--ease-out)',
  			'ease-in-out': 'var(--ease-in-out)'
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
  			'fade-in': {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			'fade-out': {
  				from: {
  					opacity: '1'
  				},
  				to: {
  					opacity: '0'
  				}
  			},
  			'slide-in-from-top': {
  				from: {
  					transform: 'translateY(-100%)'
  				},
  				to: {
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-in-from-bottom': {
  				from: {
  					transform: 'translateY(100%)'
  				},
  				to: {
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-in-from-left': {
  				from: {
  					transform: 'translateX(-100%)'
  				},
  				to: {
  					transform: 'translateX(0)'
  				}
  			},
  			'slide-in-from-right': {
  				from: {
  					transform: 'translateX(100%)'
  				},
  				to: {
  					transform: 'translateX(0)'
  				}
  			},
  			'scale-in': {
  				from: {
  					transform: 'scale(0.95)',
  					opacity: '0'
  				},
  				to: {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			},
  			'scale-out': {
  				from: {
  					transform: 'scale(1)',
  					opacity: '1'
  				},
  				to: {
  					transform: 'scale(0.95)',
  					opacity: '0'
  				}
  			},
  			'pulse-subtle': {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.8'
  				}
  			},
  			shimmer: {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(200%)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.3s ease-out',
  			'fade-out': 'fade-out 0.3s ease-out',
  			'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
  			'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
  			'slide-in-from-left': 'slide-in-from-left 0.3s ease-out',
  			'slide-in-from-right': 'slide-in-from-right 0.3s ease-out',
  			'scale-in': 'scale-in 0.2s ease-out',
  			'scale-out': 'scale-out 0.2s ease-out',
  			'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
  			shimmer: 'shimmer 2s ease-in-out infinite'
  		},
  		backdropBlur: {
  			xs: '2px',
  			sm: '4px',
  			md: '12px',
  			lg: '16px',
  			xl: '24px',
  			'2xl': '40px',
  			'3xl': '64px'
  		},
  		gridTemplateColumns: {
  			'auto-fit-xs': 'repeat(auto-fit, minmax(200px, 1fr))',
  			'auto-fit-sm': 'repeat(auto-fit, minmax(250px, 1fr))',
  			'auto-fit-md': 'repeat(auto-fit, minmax(300px, 1fr))',
  			'auto-fit-lg': 'repeat(auto-fit, minmax(350px, 1fr))',
  			'auto-fit-xl': 'repeat(auto-fit, minmax(400px, 1fr))'
  		},
  		aspectRatio: {
  			golden: '1.618 / 1',
  			video: '16 / 9',
  			photo: '4 / 3',
  			portrait: '3 / 4'
  		},
  		screens: {
  			xs: '475px',
  			'3xl': '1600px',
  			'4xl': '1920px'
  		},
  		zIndex: {
  			'60': '60',
  			'70': '70',
  			'80': '80',
  			'90': '90',
  			'100': '100'
  		}
  	}
  },
  plugins: [
    // Custom plugin for consistent component styles
    function({ addComponents, theme }) {
      addComponents({
        // Typographic Scale
        '.text-display': {
          fontSize: theme('fontSize.5xl'),
          fontWeight: theme('fontWeight.bold'),
          letterSpacing: theme('letterSpacing.tight'),
          '@screen md': {
            fontSize: theme('fontSize.7xl'),
          },
        },
        '.text-h1': {
          fontSize: theme('fontSize.4xl'),
          fontWeight: theme('fontWeight.bold'),
          letterSpacing: theme('letterSpacing.tight'),
          '@screen md': {
            fontSize: theme('fontSize.5xl'),
          },
        },
        '.text-h2': {
          fontSize: theme('fontSize.3xl'),
          fontWeight: theme('fontWeight.semibold'),
          letterSpacing: theme('letterSpacing.tight'),
          '@screen md': {
            fontSize: theme('fontSize.4xl'),
          },
        },
        '.text-h3': {
          fontSize: theme('fontSize.2xl'),
          fontWeight: theme('fontWeight.semibold'),
          letterSpacing: theme('letterSpacing.tight'),
          '@screen md': {
            fontSize: theme('fontSize.3xl'),
          },
        },
        '.text-h4': {
          fontSize: theme('fontSize.xl'),
          fontWeight: theme('fontWeight.semibold'),
          letterSpacing: theme('letterSpacing.tight'),
          '@screen md': {
            fontSize: theme('fontSize.2xl'),
          },
        },
        '.text-body-lg': {
          fontSize: theme('fontSize.lg'),
          '@screen md': {
            fontSize: theme('fontSize.xl'),
          },
        },
        '.text-body': {
          fontSize: theme('fontSize.base'),
          '@screen md': {
            fontSize: theme('fontSize.lg'),
          },
        },
        '.text-body-sm': {
          fontSize: theme('fontSize.sm'),
          '@screen md': {
            fontSize: theme('fontSize.base'),
          },
        },
        '.text-caption': {
          fontSize: theme('fontSize.xs'),
          color: 'hsl(var(--muted-foreground))',
        },

        // Base Component Styles
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme('borderRadius.md'),
          fontSize: theme('fontSize.sm'),
          fontWeight: theme('fontWeight.medium'),
          transition: 'all 0.2s ease-in-out',
          cursor: 'pointer',
          border: 'none',
          outline: 'none',
          '&:focus-visible': {
            outline: '2px solid hsl(var(--ring))',
            outlineOffset: '2px',
          },
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
          },
        },
        '.input': {
          display: 'flex',
          height: '2.5rem',
          width: '100%',
          borderRadius: theme('borderRadius.md'),
          border: '1px solid hsl(var(--border))',
          backgroundColor: 'hsl(var(--background))',
          padding: '0.5rem 0.75rem',
          fontSize: theme('fontSize.sm'),
          transition: 'all 0.2s ease-in-out',
          '&:focus': {
            outline: 'none',
            borderColor: 'hsl(var(--ring))',
            boxShadow: '0 0 0 2px hsl(var(--ring) / 0.2)',
          },
          '&::placeholder': {
            color: 'hsl(var(--muted-foreground))',
          },
          '&:disabled': {
            cursor: 'not-allowed',
            opacity: '0.5',
          },
        },
        '.card': {
          borderRadius: theme('borderRadius.lg'),
          border: '1px solid hsl(var(--border))',
          backgroundColor: 'hsl(var(--card))',
          color: 'hsl(var(--card-foreground))',
          boxShadow: theme('boxShadow.sm'),
        },
      })
    },
      require("tailwindcss-animate")
],
}

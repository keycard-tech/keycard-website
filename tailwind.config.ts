import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  future: {
    hoverOnlyWhenSupported: true,
  },

  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    fontFamily: {
      lora: ['var(--font-lora)', ...fontFamily.sans],
      inter: ['var(--font-inter)', ...fontFamily.sans],
    },

    fontWeight: {
      200: '200',
      300: '300',
      400: '400',
      500: '500',
      600: '600',
    },

    fontSize: {
      48: [
        '3rem',
        {
          lineHeight: '3.5rem',
          letterSpacing: '-0.06rem',
        },
      ],
      32: [
        '2rem',
        {
          lineHeight: '2.75rem',
          letterSpacing: '-0.06rem',
        },
      ],
      24: [
        '1.5rem',
        {
          lineHeight: '2rem',
          letterSpacing: '-0.03rem',
        },
      ],
      20: [
        '1.25rem',
        {
          lineHeight: '1.75rem',
          letterSpacing: '-0.02rem',
        },
      ],
      16: [
        '1rem',
        {
          lineHeight: '1.375rem',
          letterSpacing: '-0.02rem',
        },
      ],
      12: [
        '0.75rem',
        {
          lineHeight: '1.25rem',
          letterSpacing: '-0.02rem',
        },
      ],
    },

    colors: {
      orange: 'rgba(255, 100, 0, 1)',
      'orange-dark': 'rgba(225, 88, 0, 1)',
      dark: {
        100: 'rgba(1, 1, 1, 1)',
        60: 'rgba(1, 1, 1, 0.6)',
        8: 'rgba(1, 1, 1, 0.08)',
      },
      white: {
        100: 'rgba(255, 255, 255, 1)',
        95: 'rgba(255, 255, 255, 0.95)',
        90: 'rgba(255, 255, 255, 0.9)',
        80: 'rgba(255, 255, 255, 0.8)',
        60: 'rgba(255, 255, 255, 0.6)',
        40: 'rgba(255, 255, 255, 0.4)',
        20: 'rgba(255, 255, 255, 0.2)',
        12: 'rgba(255, 255, 255, 0.12)',
        8: 'rgba(255, 255, 255, 0.08)',
        3: 'rgba(255, 255, 255, 0.03)',
      },
      'white-dark': 'rgba(206, 206, 206, 1)',
    },

    borderRadius: {
      12: '12px',
      28: '28px',
      full: '9999px',
    },

    opacity: {},

    extend: {
      keyframes: {
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { height: '0px' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0px' },
        },
      },
      animation: {
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },

  plugins: [],
} satisfies Config

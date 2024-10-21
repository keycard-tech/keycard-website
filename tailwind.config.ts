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
      300: '300',
      400: '400',
      500: '500',
    },

    fontSize: {
      48: [
        '3rem',
        {
          lineHeight: '3.5rem',
          letterSpacing: '-0.06rem',
        },
      ],
      16: [
        '1rem',
        {
          lineHeight: '1.375rem',
          letterSpacing: '-0.02rem',
        },
      ],
    },

    colors: {
      orange: 'rgba(255, 100, 0, 1)',
      dark: {
        100: 'rgba(1, 1, 1, 1)',
        60: 'rgba(1, 1, 1, 0.6)',
        8: 'rgba(1, 1, 1, 0.08)',
      },
      white: {
        100: 'rgba(255, 255, 255, 1)',
        95: 'rgba(255, 255, 255, 0.95)',
        80: 'rgba(255, 255, 255, 0.8)',
        60: 'rgba(255, 255, 255, 0.6)',
        40: 'rgba(255, 255, 255, 0.4)',
        20: 'rgba(255, 255, 255, 0.2)',
        12: 'rgba(255, 255, 255, 0.12)',
        8: 'rgba(255, 255, 255, 0.08)',
        6: 'rgba(255, 255, 255, 0.06)',
        3: 'rgba(255, 255, 255, 0.03)',
      },
    },

    borderRadius: {
      12: '12px',
    },

    opacity: {},

    extend: {},
  },

  plugins: [],
} satisfies Config

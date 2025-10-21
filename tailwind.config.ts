import containerQueries from '@tailwindcss/container-queries'
import { scrollbarWidth } from 'tailwind-scrollbar-utilities'
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

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
      44: [
        '2.75rem',
        {
          lineHeight: '3.375rem',
          letterSpacing: '-0.055rem',
        },
      ],
      32: [
        '2rem',
        {
          lineHeight: '2.5rem',
          letterSpacing: '-0.04rem',
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
          letterSpacing: '-0.025rem',
        },
      ],
      16: [
        '1rem',
        {
          lineHeight: '1.375rem',
          letterSpacing: '-0.02rem',
        },
      ],
      14: [
        '0.875rem',
        {
          lineHeight: '1.125rem',
          letterSpacing: '-0.0175rem',
        },
      ],
      13: [
        '0.8125rem',
        {
          lineHeight: '1.0625rem',
          letterSpacing: '-0.01375rem',
        },
      ],
      12: [
        '0.75rem',
        {
          lineHeight: '1.25rem',
          letterSpacing: '0.015rem',
        },
      ],
    },

    colors: {
      orange: 'rgba(255, 100, 0, 1)',
      'orange-dark': 'rgba(225, 88, 0, 1)',
      green: 'rgba(35, 173, 160, 1)',
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
        10: 'rgba(255, 255, 255, 0.1)',
        8: 'rgba(255, 255, 255, 0.08)',
        4: 'rgba(255, 255, 255, 0.04)',
      },
      'white-dark': 'rgba(206, 206, 206, 1)',
      red: 'rgba(255, 80, 80, 1)',
    },

    borderRadius: {
      0: '0px',
      6: '6px',
      12: '12px',
      16: '16px',
      20: '20px',
      24: '24px',
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
          from: { height: '0px', opacity: '0' },
          to: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
        },
        slideUp: {
          from: {
            height: 'var(--radix-accordion-content-height)',
            opacity: '1',
          },
          to: { height: '0px', opacity: '0' },
        },
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        contentShow: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -48%) scale(0.96)',
          },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },

  plugins: [
    containerQueries,
    scrollbarWidth(),
    plugin(({ addUtilities, addVariant }) => {
      addVariant('macos', `:is([data-platform="macos"] &)`)
      addVariant('windows', `:is([data-platform="windows"] &)`)
      addVariant('linux', `:is([data-platform="linux"] &)`)
      addVariant('ios', `:is([data-platform="ios"] &)`)
      addVariant('android', `:is([data-platform="android"] &)`)
      addVariant('unknown', `:is([data-platform="unknown"] &)`)
      addUtilities({
        '.full-view-port': {
          marginLeft: 'calc(calc((100vw - 100%) / 2) * -1)',
          width: '100vw',
        },
        '.remove-full-view-port': {
          marginLeft: '0',
          width: '100%',
        },
      })
    }),
  ],
} satisfies Config

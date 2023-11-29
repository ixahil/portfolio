/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem'
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        }
      },
      colors: {
        primary: '#0a64bc',
        primaryLight: '#1aa1ed',
        white: '#ffffff',
        text: {
          DEFAULT: '#1F2937',
          light: '#FCF6F5',
          dark: '#0c1618',
          darker: '#09090b',
          primaryLight: '#1aa1ed'
        },
        light: {
          DEFAULT: '#FAFBFC',
          lighter: '#e5e7eb'
        },
        dark: {
          DEFAULT: '#0c1618',
          darker: '#09090b',
          lighter: '#52525b'
        }
      },
      screens: {
        '2xl': { max: '1535px' },
        // => @media (max-width: 1535px) { ... }

        xl: { max: '1279px' },
        // => @media (max-width: 1279px) { ... }

        lg: { max: '1023px' },
        // => @media (max-width: 1023px) { ... }

        md: { max: '767px' },
        // => @media (max-width: 767px) { ... }

        sm: { max: '639px' }
        // => @media (max-width: 639px) { ... }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        fadeIn: 'fadeIn .3s ease-in-out'
      },
      transform: {
        120: 'scale(1.2)'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), nextui()]
};
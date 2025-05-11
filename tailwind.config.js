/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'paper-white': '#FFFFFF',
        'off-white': '#F5F0EB',
        'parchment': '#D4C2AE',
        'espresso': '#2E1D10',
        'jet': '#000000'
      },
      fontFamily: {
        'canela': ['Canela Deck', 'Palatino Linotype', 'serif'],
        'dm-serif': ['DM Serif Text', 'serif']
      },
      maxWidth: {
        'content': '1100px'
      },
      padding: {
        'section': '120px'
      }
    },
  },
  plugins: [],
};
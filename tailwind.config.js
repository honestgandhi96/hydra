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
        'canela': ['Canela Deck', 'serif'],
        'dm-serif': ['DM Serif Text', 'serif']
      },
      maxWidth: {
        'content': '1100px'
      },
      padding: {
        'section': '120px'
      },
      letterSpacing: {
        'tightest': '-.075em',
        'tighter-plus': '-.05em'
      },
      height: {
        'hero': 'calc(100vh - 80px)'
      }
    },
  },
  plugins: [],
};
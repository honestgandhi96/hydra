/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#FAFAF9',
        paper: '#E8ECEF',
        sage: '#9BA8AB',
        charcoal: '#36454F',
        midnight: '#131A1C'
      },
      fontFamily: {
        display: ['Neue Haas Grotesk Display', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif']
      },
      fontSize: {
        'fluid-h1': 'clamp(2.5rem, 4vw, 3.5rem)',
        'fluid-h2': 'clamp(2rem, 3vw, 2.75rem)',
        'fluid-h3': 'clamp(1.25rem, 2vw, 2rem)'
      },
      spacing: {
        'section': '96px'
      }
    },
  },
  plugins: [],
};
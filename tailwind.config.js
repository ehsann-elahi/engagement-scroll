/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          navy: '#0F1E36',
          sapphire: '#1B365D',
          blue: '#2C4D75',
          powder: '#D4E5F7',
          ice: '#EBF3FA',
          sky: '#A8C7EC',
        },
        gold: {
          DEFAULT: '#C6A56B',
          rich: '#8a6a24',
          foil: '#d9b55e',
          light: '#f6e2a0',
          deep: '#9c7a2e',
        },
        rose: {
          powder: '#f6d3dc',
          deep: '#e8a8bb',
        },
        dark: {
          text: '#0F1E36',
          muted: '#55604f',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        royal: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Snell Roundhand"', 'cursive'],
        names: ['"Pinyon Script"', '"Great Vibes"', 'cursive'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
        arabic: ['"Amiri"', 'serif'],
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.3em',
      },
      backgroundImage: {
        'paper-pattern': "radial-gradient(#C6A56B 0.75px, transparent 0.75px), radial-gradient(#C6A56B 0.75px, #172D27 0.75px)",
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C97A',
          muted: '#8A6E2F',
        }
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'border-spin': 'border-spin 3s linear infinite',
      },
      keyframes: {
        'border-spin': {
          '0%': { '--border-angle': '0deg' },
          '100%': { '--border-angle': '360deg' },
        }
      }
    },
  },
  plugins: [],
}

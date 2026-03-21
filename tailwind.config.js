/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void:         '#080808',
        surface:      '#111111',
        gold:         '#c9a96e',
        'gold-light': '#e8d5a3',
        'gold-dim':   '#7a6040',
        ivory:        '#f5f5f0',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:    ['Syne', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
      transitionTimingFunction: {
        'out-expo':    'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-circ': 'cubic-bezier(0.85, 0, 0.15, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

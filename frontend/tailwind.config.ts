import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          750: '#2e3039',
        },
      },
      backgroundImage: {
        'grid-pattern':
          'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0, rgba(59, 130, 246, 0.15) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-pattern': '80px 80px',
      },
      boxShadow: {
        glow: '0 0 30px rgba(59, 130, 246, 0.25)',
      },
    },
  },
  plugins: [],
} satisfies Config

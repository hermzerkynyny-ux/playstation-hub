/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#0F172A',
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          400: '#94A3B8',
          100: '#F1F5F9',
        },
        orange: {
          500: '#F97316',
        },
        red: {
          500: '#EF4444',
        },
        green: {
          500: '#22C55E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
      minHeight: {
        '44': '44px',
      },
      minWidth: {
        '44': '44px',
      },
    },
  },
  plugins: [],
}

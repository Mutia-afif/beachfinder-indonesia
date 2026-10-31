/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0284c7',
          deep: '#006194',
          container: '#007BB9',
          light: '#e0f2fe',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          bg: '#F8F9FF',
          low: '#EFF4FF',
          container: '#E5EEFF',
          high: '#DCE9FF',
          highest: '#D3E4FE',
        },
        ocean: {
          navy: '#0B1C30',
          muted: '#3F4850',
          outline: '#BFC7D2',
        },
        coastal: {
          sand: '#FFDBB8',
          amber: '#825100',
          cyan: '#06b6d4',
          emerald: '#10b981',
          rose: '#BA1A1A',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'coastal': '0 10px 30px -5px rgba(2, 132, 199, 0.08)',
        'coastal-lg': '0 20px 40px -10px rgba(2, 132, 199, 0.15)',
      }
    },
  },
  plugins: [],
}


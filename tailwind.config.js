/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darker: '#1f202d',
        highlight: '#2a2b38'
      }
    }
  },
  plugins: []
}

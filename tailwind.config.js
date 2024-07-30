/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3d5a80',
        secondary: '#98c1d9',
        tertiary: '#e0fbfc',
        accent: '#ee6c4d'
      }
    }
  },
  plugins: []
}

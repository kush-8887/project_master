/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'navy' : '#1D267D',
        'dark-navy' : '#0C134F',
        'purple' : '#5C469C',
        'pink' : '#D4ADFC'
      }
    },
  },
  plugins: [],
}
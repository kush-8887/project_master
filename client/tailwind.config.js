/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'bg-black' : '#171717',
        'bg-purple' : '#6e29ff',
        'btn-color' : '#148FFF'
      }
    },
  },
  plugins: [],
}
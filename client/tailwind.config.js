/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'b-grey' : '#242529',
        'c-grey' : '#37373f',
        'selected-purple' : '#a6abff',
        'purple-hover' : 'rgb(166 171 255 / 56%)',
        'pink' : '#D4ADFC',
      },
      borderRadius: {
        'custom': '30% 70% 68% 32% / 61% 43% 57% 39%',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.rounded-custom': {
          borderRadius: '30% 70% 68% 32% / 61% 43% 57% 39%',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
}
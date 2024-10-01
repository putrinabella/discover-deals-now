/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
      colors: {
        LightGrayishGreen: '#E4E6D9',
        PaleSage: '#C0CFB2',
        SageGreen: '#6C8776',
        DeepMossGreen: '#45624E',
        DarkForest: '#27526',
        SunflowerPetalYellow: '#FFD54F',
        SunflowerLeafGreen: '#6B8E23',
        SoftSunflowerYellow: '#FFF8E1'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}


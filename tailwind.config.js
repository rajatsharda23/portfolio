/** @type {import('tailwindcss').Config} */
// src/assets/fonts/AvenirNextLTPro-Demi.woff
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Apple_Regular: ['Apple_Regular'],
        Apple_Bold : ['Apple_Bold'],
        Apple_Italic : ['Apple_Italic'],
        Apple_B_Italic : ['Apple_B_Italic'],
      },
      backgroundImage: {
        'light-bg': "url('./assets/ui/wallpaper-day.jpg')",
      },
      colors: {
        notepadBG: '#1A1D1D',
        notepadTextBG: '#1F1F1E',
        notepadSelected: '#AB8A1F',
        menuBar: '#2B2B30',
      }
    },
  },
  plugins: [],
}


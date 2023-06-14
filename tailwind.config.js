/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#996D01',
        'secondary': '#747067',
      },
      fontFamily: {
        'ibm': ['IBM Plex Sans', 'sans-serif']
      },
      zIndex: {
        '45': '45',
        '100': '100',
      },
      animation: {
        'spin-slow': 'pulse 3s ease-out infinite;',
      }
    },
  },
  plugins: [
  ],
}
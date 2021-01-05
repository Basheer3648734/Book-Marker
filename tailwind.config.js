module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        serif:['poppins','serif']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  darkMode:'class'
}

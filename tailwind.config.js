/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./**/*.html", "./**/*.js"],
  theme: {
    extend: {
      colors: {
        brightAaqua: '#1AFFE4', // bright aqua
        teal: '#14B8A6', // teal
        darkTeal: '#0A574E', // dark teal
        lightGray: '#E6E6E6', // light gray
        darkGray: '#292929', // dark gray
      },
    },
  },
  plugins: [],
}


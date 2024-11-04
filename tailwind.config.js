/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        maxWidth: {
          'custom-container': '1140px',
        },
        perspective: {
          'none': 'none',
          'sm': '500px !important',
          'md': '1000px !important',
          'lg': '1500px !important',
          'xl': '2000px !important',
        },
      },
    },
    plugins: [],
  }
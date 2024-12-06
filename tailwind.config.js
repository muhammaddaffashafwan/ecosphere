/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Adjust the paths based on your project structure
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        optician: ['Optician', 'sans-serif'], // Nama font custom
      },
      screens: {
        'mobile': '425px', // Breakpoint khusus untuk layar 425px
      },
      colors: {
        softCream: '#F7FFEC',
      },
    },
  },
  plugins: [],
};

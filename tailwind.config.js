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
      colors: {
        softCream: '#F7FFEC',
      },
    },
  },
  plugins: [],
};

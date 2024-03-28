/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        clash: ['ClashDisplay', 'fantasy', 'Arial', 'sans-serif'],
        inter: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

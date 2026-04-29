/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        clash: ['ClashDisplay', 'fantasy', 'Arial', 'sans-serif'],
        inter: ['Inter', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#DEB36F',
        background: '#2B0E45',
        pantone: '#6667AB',
        purple: '#B3A0CF',
        orange: '#FD5E09',
        yellow: '#FDC959',
        white: '#F8F8F8',
        grey: '#ECECEC',
        black: '#111111',
        'black-light': '#1D1D1D',
        'black-ink': '#221E1F',
        ashgray: '#E0E0E0',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
  ],
};

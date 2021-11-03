module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@vueform/slider/tailwind'), require('tailwind-scrollbar')],
  variants: {
    extend: {
      opacity: ['disabled'],
    },
    scrollbar: ['rounded', 'dark'],
  },
};

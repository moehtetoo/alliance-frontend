/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const withMT = require('@material-tailwind/react/utils/withMT');
// eslint-disable-next-line no-undef
module.exports = withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
});

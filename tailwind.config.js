/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0F171F',
        primary: '#3B82F6'
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9ca3af',
        highlight: '#ef4444',
        lighter: '#e4e4e7',
        bgColor: '#27272a',
        bgSecondColor: '#3f3f46',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-green": "#06323c",
        "light-green": "#a9bbbf",
        "light-cream": "#deddd8",
      },
    },
  },
  plugins: [],
};

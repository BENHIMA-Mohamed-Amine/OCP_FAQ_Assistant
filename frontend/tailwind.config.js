/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#27AE60",
        "delete-color": "#E74C3C",
        "link-color": "#2980B9",
        "black-text-color": "#3E3E3E",
        "white-text-color": "#EEEEEE",
      },
    },
  },
  plugins: [],
};

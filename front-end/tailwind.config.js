const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        main: "#1E1E1E",
        "custom-green": "#27AE60",
        red: "#E74C3C",
        blue: "#2980B9",
      },
      backgroundColor: {
        main: "#27AE60",
      },
    },
  },
  plugins: [flowbite.plugin()],
};

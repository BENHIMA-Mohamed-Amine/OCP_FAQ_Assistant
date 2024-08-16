const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        main: "#2c3e50",
        "custom-green": "#27AE60",
        red: "#E74C3C",
        blue: "#2980B9",
      },
      backgroundColor: {
        main: "#27AE60",
      },
    },
  },
  plugins: [
    require("flowbite/plugin")({
      datatables: true,
    }),
    flowbite.plugin(),
  ],
};

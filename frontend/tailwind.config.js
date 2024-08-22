const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  // darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0fdf4",
          100: "#69e593",
          200: "#36b869",
          300: "#36b869",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#27AE60",
          800: "#14a457",
          900: "#09a054",
          950: "#009045",
        },
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
  fontFamily: {
    body: [
      "Inter",
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "system-ui",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "Noto Sans",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Noto Color Emoji",
    ],
    sans: [
      "Inter",
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "system-ui",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "Noto Sans",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Noto Color Emoji",
    ],
  },
  plugins: [
    require("flowbite/plugin")({
      datatables: true,
    }),
    flowbite.plugin(),
  ],
};

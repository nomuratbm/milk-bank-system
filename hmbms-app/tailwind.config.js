/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: { 
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0D072F",
          badge:   "#10103A",
        },
        ink: {
          DEFAULT: "#1E1E1E",
          400: "#B3B3B3",
          600: "#666666",
        },
        supsup: {
          DEFAULT: "#FFF192",
          accent:  "#FFD230",
        },
        milky: {
          DEFAULT: "#7FD8D4",
          accent:  "#27978B",
        },
        moms: {
          DEFAULT: "#F4A7C3",
          accent:  "#D4608A",
        },
      },
    },
  },
  plugins: [],
};

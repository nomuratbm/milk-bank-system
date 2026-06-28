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
      },
    },
  },
  plugins: [],
};


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        WHITE: "#ffffff",
        BACKGROUND:"#F1F2F7",
        BLACK: "#000000",
        LAVENDER :"#8B95E3",
        SKYBLUE:"#DCDFFF",
      },
    },
  },
  plugins: [],
};

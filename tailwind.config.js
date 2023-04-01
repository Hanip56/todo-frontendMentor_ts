/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "375px",
        xl: "1440px",
      },
      colors: {
        brightBlue: "hsl(220, 98%, 61%)",
        checkBgFrom: "hsl(192, 100%, 67%)",
        checkBgTo: "hsl(280, 87%, 65%)",
        // light
        veryLightGray: "hsl(0, 0%, 98%)",
        veryLightGrayishBlue: "hsl(236, 33%, 92%)",
        lightGrayishBlue: "hsl(233, 11%, 84%)",
        lightGrayishBlue: "hsl(234, 39%, 85%)",
        lightGrayishBlueHover: "hsl(236, 33%, 92%)",

        // dark
        darkGrayishBlue: "hsl(236, 9%, 61%)",
        veryDarkGrayishBlue: "hsl(235, 19%, 35%)",
        veryDarkBlue: "hsl(235, 21%, 11%)",
        veryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
        darkGrayishBlue: "hsl(234, 11%, 52%)",
        veryDarkGrayishBlue: "hsl(233, 14%, 35%)",
        veryDarkGrayishBlue2: "hsl(237, 14%, 26%)",
      },
    },
  },
  plugins: [],
};

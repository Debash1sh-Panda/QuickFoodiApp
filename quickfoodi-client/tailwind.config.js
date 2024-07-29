/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "dark-green" : "#164A41",
        "mid-green" : "#4D774E",
        "light-green" : "#9DCBBD",
        "orange" : "#F1B24A"
      },
    },
  },
  plugins: [require("daisyui")],
}


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
      keyframes: {
        slideUpFadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        slideUpFadeIn: 'slideUpFadeIn 0.5s ease-out',
      },
    },
  },
  plugins: [require("daisyui")],
}


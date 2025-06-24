/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#a1b8ce',
        lightgray: '#f0f0f0',
        bgdarkblue: "#566a8f",
        bgtextdark: '#4d5d81',
        textlight: "#f4fdff",
        gold: "#eeba49",
        bgpagelight: "#b4c3d6",
        bluecustom: "#91a5c2"
      },
      boxShadow: {
        darkblue: "0 0 1px 3px #415870",
      },
      borderWidth: {
        3: '3px'
      }
    },
  },
  plugins: [],
}


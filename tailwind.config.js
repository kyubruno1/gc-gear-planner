/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#a1b8ce',
        textLightBlue: '#AAE1FF',
        lightgray: '#f0f0f0',
        bgdarkblue: "#566a8f",
        bgtextdark: '#4d5d81',
        textlight: "#f4fdff",
        gold: "#eeba49",
        bgpagelight: "#b4c3d6",
        bluecustom: "#91a5c2",
        equipCommon: 'text-gray-500',
        equipRare: 'text-blue-400',
        equipEpic: '#eeba49',
        equipLegendary: 'text-purple-500',
        equipAncient: '#D4646F'
      },
      boxShadow: {
        darkblue: "0 0 1px 3px #415870",
      },
      borderWidth: {
        3: '3px'
      },
      
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-title': {
          'text-shadow': '2px 2px 3px rgba(0,0,0,1)',
        },
        '.text-outline-xs': {
          'text-shadow': `0 0 0.5px #000`
        },
        '.text-outline-sm': {
          'text-shadow': `0 0 1px #000`
        },
        '.text-outline-md': {
          'text-shadow': `0 0 2px #000`
        },
        '.text-outline-lg': {
          'text-shadow': `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000`
        },
        '.hide-scrollbar': {
        '-ms-overflow-style': 'none',      // IE & Edge
        'scrollbar-width': 'none'          // Firefox
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none'                    // Chrome e Safari
        }
      })
    }
  ]
}


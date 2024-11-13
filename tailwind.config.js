/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Helvetica', 'sans-serif'], // Add custom font as the primary
      },
      animation: {
        'rotate-animation': 'rotate-animation 30s linear infinite',
      },
      keyframes: {
        'rotate-animation': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}


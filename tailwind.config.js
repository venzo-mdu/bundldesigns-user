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
      backdropBlur: {
        '90': '90px', // Adds a custom 90px blur option
      }, screens: {
        xl: '1800px', // Set the xl breakpoint to 1440px instead of 1280px
        lg:'1400px',
        md:'1024px'
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
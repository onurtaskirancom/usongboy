/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        foreground: {
          light: 'rgb(0, 0, 0)',
          dark: 'rgb(255, 255, 255)',
        },
        backgroundStart: {
          light: 'rgb(214, 219, 220)',
          dark: 'rgb(0, 0, 0)',
        },
        backgroundEnd: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(0, 0, 0)',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
      });
    },
  ],
};

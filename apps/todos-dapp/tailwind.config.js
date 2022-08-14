const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  purge: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    fontFamily: {
      sans: ['Play', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      flex: {
        '1/12': '0 0 8.3333%',
        '2/12': '0 0 16.6667%',
        '3/12': '0 0 25%',
        '6/12': '0 0 50%',
        '9/12': '0 0 75%',
        '10/12': '0 0 83.3333%',
        '11/12': '0 0 91.6667%',
      },
      maxWidth: {
        '1/12': '8.3333%',
        '2/12': '16.6667%',
        '3/12': '25%',
        '6/12': '50%',
        '9/12': '75%',
        '10/12': '83.3333%',
        '11/12': '91.6667%',
      },
      lineHeight: {
        '0': '0',
      },
    },
    colors : {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      green: colors.emerald,
    }
  },
  plugins: [],
}
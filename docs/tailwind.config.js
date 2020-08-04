const defu = require('defu');
const contentTailwind = require('@nuxt/content-theme-docs/src/tailwind.config.js');

module.exports = defu({
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#F2F4FA',
          200: '#DFE2F2',
          300: '#CCD1EB',
          400: '#A5AFDB',
          500: '#7F8CCC',
          600: '#727EB8',
          700: '#4C547A',
          800: '#393F5C',
          900: '#262A3D'
        },
      },
    },
    typography: (theme) => defu({
      dark: {
        css: {
          a: {
            color: theme('colors.primary.500'),
          },
        },
      },
    }, contentTailwind.theme.typography(theme)),
  },
}, contentTailwind);

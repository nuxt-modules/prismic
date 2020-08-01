const defu = require('defu');
const contentTaiwind = require('@nuxt/content-theme-docs/src/tailwind.config.js');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = defu({
  theme: {
    extend: {
      colors: {
        primary: {
          ...defaultTheme.colors.blue,
          500: '#7F8CCC',
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
    }, contentTaiwind.theme.typography(theme)),
  },
}, contentTaiwind);

const defu = require('defu');
const contentTailwind = require('@nuxt/content-theme-docs/src/tailwind.config.js');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = defu({
  theme: {
    extend: {
      colors: {
        primary: {
          ...defaultTheme.colors.blue,
          500: '#7F8CCC',
          900: '#243956'
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

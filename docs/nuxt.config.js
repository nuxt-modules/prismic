import path from 'path';
import theme from '@nuxt/content-theme-docs';

export default theme({
  loading: {
    color: "#7F8CCC"
  },
  generate: {
    fallback: true,
    routes: ['/'],
  },
  buildModules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-27914050-11'
    }]
  ],
});

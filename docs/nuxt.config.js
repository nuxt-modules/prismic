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
    }],
    'nuxt-ackee'
  ],
  ackee: {
    server: 'https://ackee.nuxtjs.com',
    domainId: 'c34dbd9b-00c1-4de2-8274-29314298c092',
    detailed: true
  }
});

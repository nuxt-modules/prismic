import path from 'path';
import { withDocus } from 'docus';

export default withDocus({
  docus: {
    colors: {
      primary: "#7F8CCC"
    }
  },
  generate: {
    fallback: true,
  },
  buildModules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-27914050-11'
    }],
    'vue-plausible'
  ],
  plausible: {
    domain: 'prismic.nuxtjs.org'
  }
});

import { withDocus } from 'docus'

export default withDocus({
  docus: {
    colors: {
      primary: '#7F8CCC'
    }
  },
  generate: {
    fallback: true
  },
  buildModules: [
    'vue-plausible'
  ],
  plausible: {
    domain: 'prismic.nuxtjs.org'
  }
})

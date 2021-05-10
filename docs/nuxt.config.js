import { withDocus } from 'docus'

export default withDocus({
  generate: {
    fallback: true
  },
  buildModules: ['vue-plausible'],
  plausible: {
    domain: 'prismic.nuxtjs.org'
  }
})

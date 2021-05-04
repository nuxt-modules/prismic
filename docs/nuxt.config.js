import { withDocus } from 'docus'

export default withDocus({
  generate: {
    fallback: true
  },
  buildModules: [
    [
      'vue-plausible',
      {
        domain: 'prismic.nuxtjs.org'
      }
    ]
  ]
})

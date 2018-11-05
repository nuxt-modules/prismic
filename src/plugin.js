import Vue from 'vue'
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'

const moduleOptions = <%= serialize(options) %>

export default async ({ app, req, route, res, query, redirect }, inject) => {
  let options = {}

  // Pass through server requests, primarily for preview
  if (process.server) {
    options.req = req
  }

  let api = await Prismic.api(moduleOptions.endpoint, options)

  let prismic = new Vue({
    computed: {
      api() {
        return api
      },

      dom() {
        return PrismicDOM
      }
    },
    methods: {
      linkResolver: moduleOptions.linkResolver
    }
  })

  inject('prismic', prismic)

  // Preview support
  if (route.path === '/preview') {
    const { token } = query

    if (token) {
      let url = await api.previewSession(token, moduleOptions.linkResolver, '/')

      if (process.server) {
        res.setHeader('Set-Cookie', [
          Prismic.previewCookie +
            `=` +
            token +
            `; max-age=${30 * 60 * 1000}; path=/`
        ]) // Server-side
      } else {
        document.cookie =
          Prismic.previewCookie +
          `=` +
          token +
          `; max-age=${30 * 60 * 1000}; path=/` // Client-side
      }

      redirect(url)
    } else {
      redirect('/')
    }
  }
}

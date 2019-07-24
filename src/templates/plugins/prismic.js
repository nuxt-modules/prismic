import Vue from 'vue'
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'

import linkResolver from '../link-resolver.js'
import htmlSerializer from '../html-serializer.js'

export default async (context, inject) => {
  const { req, route, res, query, redirect, nuxtState } = context
  let options = {}

  // Pass through server requests, primarily for preview
  if (process.server) {
    options.req = req
  }

  let api = await Prismic.api('<%= options.endpoint %>', options)

  let prismic = new Vue({
    computed: {
      api() {
        return api
      },
      predicates() {
        return Prismic.Predicates
      },
      dom() {
        return PrismicDOM
      }
    },
    methods: {
      asHtml(richText) {
        if (richText) {
          return PrismicDOM.RichText.asHtml(
            richText,
            linkResolver,
            htmlSerializer
          )
        }
      },
      asText(richText) {
        if (richText) {
          return PrismicDOM.RichText.asText(richText)
        }
      },
      asLink(link) {
        if (link) {
          return PrismicDOM.Link.url(
            link,
            linkResolver
          )
        }
      },
      asDate(date) {
        if (date) {
          return PrismicDOM.Date(date)
        }
      },
      <% if (options.preview) { %>
      async preview() {
        let url = '/'
        const { token } = query

        if (token) {
          url = await this.api.previewSession(token, this.linkResolver, '/')
          let cookie = [
            `${Prismic.previewCookie}=${token}`,
            `max-age=${30 * 60 * 1000}`,
            'path=/'
          ].join('; ')

          if (process.server) {
            res.setHeader('Set-Cookie', [cookie])
          } else {
            document.cookie = cookie
          }
        }

        if (process.server) {
          returnredirect(302, url)
        } else {
          window.location.replace(url)
        }
      },<% } %>
      ...(linkResolver && { linkResolver }),
      ...(htmlSerializer && { htmlSerializer })
    }
  })

  inject('prismic', prismic)
  context.$prismic = prismic
  <% if (options.preview) { %>
  if (process.server && !process.static && route.path === '<%= options.preview %>') {
    await prismic.preview()
  }
  if (process.client && process.static && route.path !== '<%= options.preview %>') {
    const hasPreviewCookie = (document.cookie || '').indexOf(`${Prismic.previewCookie}=`) !== -1
    // Refresh data from Prismic preview
    hasPreviewCookie && window.onNuxtReady(async (app) => {
      console.info('[prismic-nuxt] Reload page data for preview')
      app.$loading && app.$loading.start()
      const context = app.$options.context
      await app.$store.dispatch('nuxtServerInit', context)
      const pages = $nuxt.$route.matched.map((match) => match.instances.default)
      const promises = pages.map(async (page) => {
        if (page.$options.fetch) {
          await page.$options.fetch(context)
        }
        if (page.$options.asyncData) {
          const newData = await page.$options.asyncData(context)
          for (const key in newData) {
            Vue.set(page.$data, key, newData[key])
          }
        }
      })
      await Promise.all(promises)
      app.$loading && app.$loading.finish()
    })
  }<% } %>
}

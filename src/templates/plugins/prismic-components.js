import Vue from 'vue'
import { common, nuxt } from 'prismic-vue/components'

Object.entries({ ...common, ...nuxt }).forEach(([_, c]) => {
  Vue.component(c.name, c)
})

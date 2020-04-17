import Vue from 'vue'
import { common, nuxt } from '@prismicio/vue/components/common'

Object.entries({ ...common, ...nuxt }).forEach(([_, c]) => {
  Vue.component(c.name, c)
})

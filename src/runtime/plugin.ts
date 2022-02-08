import { defineNuxtPlugin } from '#app'
import { createPrismic } from '@prismicio/vue'

import { name as pkgName } from '../../package.json'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(createPrismic(nuxtApp.payload.config[pkgName]))
})

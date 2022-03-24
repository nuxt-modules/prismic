import { defineNuxtPlugin } from '#app'
import NuxtLink from '#app/components/nuxt-link'

import linkResolver from '#build/prismic/linkResolver'
import client from '#build/prismic/client'

import { createPrismic } from '@prismicio/vue'

import { name as pkgName } from '../../package.json'
import { PrismicModuleOptions } from '../types'

export default defineNuxtPlugin((nuxtApp) => {
	const mergedOptions: PrismicModuleOptions = nuxtApp.payload.config[pkgName]

	nuxtApp.vueApp.use(createPrismic({
		...mergedOptions,
		client,
		linkResolver,
		injectComponents: false, // Handled at module level
		components: {
			linkInternalComponent: NuxtLink,
			linkExternalComponent: NuxtLink,
			...mergedOptions.components
		}
	}))
})

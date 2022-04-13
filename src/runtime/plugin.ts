import { defineNuxtPlugin } from '#app'
import NuxtLink from '#app/components/nuxt-link'

import { createPrismic } from '@prismicio/vue'

import { name as pkgName } from '../../package.json'
import { PrismicModuleOptions } from '../types'

import client from '#build/prismic/client'
import linkResolver from '#build/prismic/linkResolver'
import htmlSerializer from '#build/prismic/htmlSerializer'

export default defineNuxtPlugin((nuxtApp) => {
	const mergedOptions: PrismicModuleOptions =
		nuxtApp.payload.config[pkgName] ??
		nuxtApp.payload.config.public[pkgName] ??
		{}

	nuxtApp.vueApp.use(createPrismic({
		...mergedOptions,
		client,
		linkResolver,
		htmlSerializer,
		injectComponents: false, // Handled at module level
		components: {
			linkInternalComponent: NuxtLink,
			linkExternalComponent: NuxtLink,
			...mergedOptions.components
		}
	}))
})

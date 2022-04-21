import { defineNuxtPlugin } from '#app'
import NuxtLink from '#app/components/nuxt-link'

import { createPrismic } from '@prismicio/vue'

// import { name as pkgName } from '../../package.json'
import { PrismicModuleOptions } from '../types'

// @ts-expect-error vfs cannot be resolved here
import client from '#build/prismic/proxy/client'
// @ts-expect-error vfs cannot be resolved here
import linkResolver from '#build/prismic/proxy/linkResolver'
// @ts-expect-error vfs cannot be resolved here
import htmlSerializer from '#build/prismic/proxy/htmlSerializer'

// TODO: Revert when fixed
const pkgName = '@nuxtjs/prismic'

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

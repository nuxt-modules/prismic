import { defineNuxtPlugin, useCookie, useRequestEvent, refreshNuxtData } from '#app'
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

	const prismicPlugin = createPrismic({
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
	})

	nuxtApp.vueApp.use(prismicPlugin)

	if (mergedOptions.preview) {
		const previewCookie = useCookie('io.prismic.preview').value

		// Update client with req when running server side
		if (process.server) {
			prismicPlugin.client.enableAutoPreviewsFromReq(useRequestEvent()?.req)
		}

		if (previewCookie) {
			try {
				const session = typeof previewCookie === 'string' ? JSON.parse(decodeURIComponent(previewCookie)) : previewCookie

				if (Object.keys(session).some(key =>
					key in session &&
					typeof session[key] === 'object' &&
					session[key] !== null &&
					'preview' in session[key] &&
					session[key].preview)
				) {
					refreshNuxtData()
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.warn('Failed to parse Prismic preview cookie', error)
			}
		}
	}
})

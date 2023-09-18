import { isRepositoryEndpoint, getRepositoryName } from '@prismicio/client'
import { createPrismic } from '@prismicio/vue'

import { PrismicModuleOptions } from '../types'
import NuxtLink from '#app/components/nuxt-link'
import { defineNuxtPlugin, useCookie, useRequestEvent, onNuxtReady, refreshNuxtData, useHead, useRuntimeConfig } from '#imports'

// @ts-expect-error vfs cannot be resolved here
import client from '#build/prismic/proxy/client'
// @ts-expect-error vfs cannot be resolved here
import linkResolver from '#build/prismic/proxy/linkResolver'
// @ts-expect-error vfs cannot be resolved here
import richTextSerializer from '#build/prismic/proxy/richTextSerializer'

export default defineNuxtPlugin((nuxtApp) => {
	const options: PrismicModuleOptions = useRuntimeConfig().public.prismic

	const prismicPlugin = createPrismic({
		...options,
		client,
		linkResolver,
		richTextSerializer,
		injectComponents: false, // Handled at module level
		components: {
			linkInternalComponent: NuxtLink,
			linkExternalComponent: NuxtLink,
			...options.components
		}
	})

	nuxtApp.vueApp.use(prismicPlugin)

	if (options.preview) {
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
					onNuxtReady(() => refreshNuxtData())
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.warn('Failed to parse Prismic preview cookie', error)
			}
		}
	}

	if (options.toolbar) {
		// Add toolbar
		const repositoryName = isRepositoryEndpoint(options.endpoint)
			? getRepositoryName(options.endpoint)
			: options.endpoint

		useHead({
			script: [{
				key: 'prismic-preview',
				src: `https://static.cdn.prismic.io/prismic.min.js?repo=${repositoryName}&new=true`,
				async: true,
				defer: true
			}]
		})
	} else {
		// TODO: We might want to let user disable this behavior because it might have unexpected side effects
		useCookie('io.prismic.preview').value = null
	}

	return {
		provide: { prismic: prismicPlugin }
	}
})

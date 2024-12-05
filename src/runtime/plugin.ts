import { createClient, type Client } from '@prismicio/client'
import { createPrismic } from '@prismicio/vue'

import type { PrismicModuleOptions } from '../types'
import { logger } from './logger'
import { defineNuxtPlugin } from '#app'
import NuxtLink from '#app/components/nuxt-link'
import { useCookie, useRequestEvent, onNuxtReady, refreshNuxtData, useHead, useRuntimeConfig, useRouter } from '#imports'

// @ts-expect-error vfs cannot be resolved here
import _client from '#build/prismic/proxy/client'
// @ts-expect-error vfs cannot be resolved here
import linkResolver from '#build/prismic/proxy/linkResolver'
// @ts-expect-error vfs cannot be resolved here
import richTextSerializer from '#build/prismic/proxy/richTextSerializer'

export default defineNuxtPlugin(async (nuxtApp) => {
	const options: PrismicModuleOptions = useRuntimeConfig().public.prismic
	let client: Client | undefined
	if (typeof _client === 'function') {
		try {
			client = await nuxtApp.runWithContext(() => _client())
		}
		catch (error) {
			logger.error('An error happened while resolving your Prismic custom client, disabling Prismic module gracefully...', error)

			// The Vue plugin still requires a client to work, we're providing an obviously broken one.
			client = createClient(
				'error-resolving-custom-client',
				{ ...options, documentAPIEndpoint: undefined },
			)
		}
	}
	else {
		client = _client
	}

	const endpoint = options.environment || options.endpoint || client?.documentAPIEndpoint || ''

	const prismicPlugin = createPrismic({
		...options,
		endpoint,
		// TypeScript expects either an endpoint of a client, not both
		client: client as undefined,
		linkResolver,
		richTextSerializer,
		injectComponents: false, // Handled at module level
		components: {
			linkInternalComponent: NuxtLink,
			linkExternalComponent: NuxtLink,
			...options.components,
		},
	})

	nuxtApp.vueApp.use(prismicPlugin)

	if (options.preview) {
		const previewCookie = useCookie('io.prismic.preview').value

		// Update client with req when running server side
		if (import.meta.server) {
			const req = useRequestEvent()?.node.req
			if (req) {
				prismicPlugin.client.enableAutoPreviewsFromReq(req)
			}
		}

		if (previewCookie) {
			try {
				const session = typeof previewCookie === 'string' ? JSON.parse(decodeURIComponent(previewCookie)) : previewCookie

				if (Object.keys(session).some(key =>
					key in session
					&& typeof session[key] === 'object'
					&& session[key] !== null
					&& 'preview' in session[key]
					&& session[key].preview)
				) {
					let afterEachCalled = false
					onNuxtReady(() => {
						if (!afterEachCalled) {
							refreshNuxtData()
						}
					})
					useRouter().afterEach(() => {
						afterEachCalled = true
						refreshNuxtData()
					})
				}
			}
			catch (error) {
				console.warn('Failed to parse Prismic preview cookie', error)
			}
		}
	}

	if (options.toolbar && prismicPlugin.client?.repositoryName) {
		// Add toolbar
		useHead({
			script: [{
				key: 'prismic-preview',
				src: `https://static.cdn.prismic.io/prismic.min.js?repo=${prismicPlugin.client.repositoryName}&new=true`,
				async: true,
				defer: true,
				crossorigin: 'anonymous',
			}],
		})
	}
	else {
		// TODO: We might want to let user disable this behavior because it might have unexpected side effects
		useCookie('io.prismic.preview').value = null
	}

	return {
		provide: { prismic: prismicPlugin },
	}
})

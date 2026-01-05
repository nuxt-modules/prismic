import { defineNuxtPlugin } from "#app"
import NuxtLink from "#app/components/nuxt-link"
import _client from "#build/prismic/proxy/client"
// @ts-expect-error - Proxy file
import linkResolver from "#build/prismic/proxy/linkResolver"
// @ts-expect-error - Proxy file
import richTextComponents from "#build/prismic/proxy/richTextComponents"
import {
	onNuxtReady,
	refreshNuxtData,
	useCookie,
	useHead,
	useRequestEvent,
	useRouter,
	useRuntimeConfig,
} from "#imports"
import { Client, cookie, createClient, getToolbarSrc } from "@prismicio/client"
import { createPrismic } from "@prismicio/vue"

export default defineNuxtPlugin({
	name: "prismic:setup",
	parallel: true,
	async setup(nuxtApp) {
		const options = useRuntimeConfig().public.prismic

		const client = await resolveClient()
		handlePreview()
		addToolbar()

		async function resolveClient() {
			if ((_client as unknown) instanceof Client) {
				return _client!
			} else if (typeof _client === "function") {
				try {
					return await nuxtApp.runWithContext(() =>
						(_client as unknown as () => Client)(),
					)
				} catch (error) {
					console.error(
						"[@nuxtjs/prismic] An error happened while resolving your Prismic custom client, disabling Prismic module gracefully...",
						error,
					)

					// The Vue plugin still requires a client to work, we're providing an obviously broken one.
					return createClient(
						"error-resolving-custom-client",
						options.clientConfig,
					)
				}
			} else {
				return createClient(
					options.environment || options.endpoint || "endpoint-not-provided",
					options.clientConfig,
				)
			}
		}

		function handlePreview() {
			if (options.preview) {
				const previewCookie = useCookie("io.prismic.preview").value

				// Update client with req when running server side
				if (import.meta.server) {
					const req = useRequestEvent()?.node.req
					if (req) {
						client.enableAutoPreviewsFromReq(req)
					}
				}

				if (previewCookie) {
					try {
						const session =
							typeof previewCookie === "string"
								? JSON.parse(decodeURIComponent(previewCookie))
								: previewCookie

						if (
							Object.keys(session).some(
								(key) =>
									key in session &&
									typeof session[key] === "object" &&
									session[key] !== null &&
									"preview" in session[key] &&
									session[key].preview,
							)
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
					} catch (error) {
						console.warn("Failed to parse Prismic preview cookie", error)
					}
				}
			}
		}

		function addToolbar() {
			if (options.toolbar) {
				// Add toolbar
				useHead({
					script: [
						{
							key: "prismic-preview",
							src: getToolbarSrc(client.repositoryName),
							async: true,
							defer: true,
							crossorigin: "anonymous",
						},
					],
				})
			} else {
				// TODO: We might want to let user disable this behavior because it might have unexpected side effects
				useCookie(cookie.preview).value = null
			}
		}

		const prismicPlugin = createPrismic({
			client,
			linkResolver,
			components: {
				linkInternalComponent: NuxtLink,
				linkExternalComponent: NuxtLink,
				richTextComponents,
			},
		})

		nuxtApp.vueApp.use(prismicPlugin)
		return {
			provide: { prismic: prismicPlugin },
		}
	},
})

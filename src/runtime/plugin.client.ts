import type { PrismicModuleOptions } from '../types'
import { defineNuxtPlugin, refreshNuxtData, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin((_nuxtApp) => {
	const options: PrismicModuleOptions = useRuntimeConfig().public.prismic

	// Hot reload preview updates
	if (options.preview) {
		window.addEventListener('prismicPreviewUpdate', (event) => {
			event.preventDefault()
			refreshNuxtData()
		})
	}
})

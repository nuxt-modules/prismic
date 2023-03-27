import { defineNuxtPlugin, refreshNuxtData } from '#app'

import { PrismicModuleOptions } from '../types'

export default defineNuxtPlugin((nuxtApp) => {
	const mergedOptions: PrismicModuleOptions = useRuntimeConfig().public.prismic

	// Hot reload preview updates
	if (mergedOptions.preview) {
		window.addEventListener('prismicPreviewUpdate', (event) => {
			event.preventDefault()
			refreshNuxtData()
		})
	}
})

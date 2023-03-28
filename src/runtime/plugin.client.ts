import { defineNuxtPlugin, refreshNuxtData } from '#app'

import { PrismicModuleOptions } from '../types'

export default defineNuxtPlugin((nuxtApp) => {
	const options: PrismicModuleOptions = useRuntimeConfig().public.prismic

	// Hot reload preview updates
	if (options.preview) {
		window.addEventListener('prismicPreviewUpdate', (event) => {
			event.preventDefault()
			refreshNuxtData()
		})
	}
})

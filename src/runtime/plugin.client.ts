import { PrismicModuleOptions } from '../types'
import { defineNuxtPlugin, refreshNuxtData, useRuntimeConfig } from '#imports'

import moduleOptions from '#prismicOptions'

export default defineNuxtPlugin((nuxtApp) => {
	const options = moduleOptions as PrismicModuleOptions

	// Hot reload preview updates
	if (options.preview) {
		window.addEventListener('prismicPreviewUpdate', (event) => {
			event.preventDefault()
			refreshNuxtData()
		})
	}
})

import { defineNuxtPlugin, refreshNuxtData } from '#app'

// import { name as pkgName } from '../../package.json'
import { PrismicModuleOptions } from '../types'

// TODO: Revert when fixed
const pkgName = '@nuxtjs/prismic'

export default defineNuxtPlugin((nuxtApp) => {
	const mergedOptions: PrismicModuleOptions =
		nuxtApp.payload.config[pkgName] ??
		nuxtApp.payload.config.public[pkgName] ??
		{}

	// Hot reload preview updates
	if (mergedOptions.preview) {
		window.addEventListener('prismicPreviewUpdate', (event) => {
			event.preventDefault()
			refreshNuxtData()
		})
	}
})

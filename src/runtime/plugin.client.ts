import { defineNuxtPlugin } from "#app"
import { refreshNuxtData, useRuntimeConfig } from "#imports"

export default defineNuxtPlugin({
	name: "prismic:plugin:client",
	parallel: true,
	setup() {
		if (useRuntimeConfig().public.prismic?.preview) {
			window.addEventListener("prismicPreviewUpdate", (event) => {
				event.preventDefault()
				refreshNuxtData()
			})
		}
	},
})

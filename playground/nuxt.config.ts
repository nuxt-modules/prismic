export default defineNuxtConfig({
	modules: ["../src/module"],

	compatibilityDate: "2026-01-05",

	prismic: {
		endpoint: 'nuxtjs-prismic',
		clientConfig: {
			routes: [{ type: "kitchen_sink", path: "/kitchen-sink" }],
		},
	},
})

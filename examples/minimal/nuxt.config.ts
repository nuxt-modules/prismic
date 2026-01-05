export default defineNuxtConfig({
	modules: ["@nuxtjs/prismic"],

	compatibilityDate: "2025-12-24",

	prismic: {
		endpoint: "nuxtjs-prismic",
		clientConfig: {
			routes: [{ type: "kitchen_sink", path: "/kitchen-sink" }],
		},
	},
})

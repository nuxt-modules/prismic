import prismic from "../../../src/module"

export default defineNuxtConfig({
	modules: [prismic],

	prismic: {
		endpoint: `proxy-not-found`,
		clientConfig: {
			routes: [{ type: "kitchen_sink", path: "/kitchen-sink" }],
		},
	},
})

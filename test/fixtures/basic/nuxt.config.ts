import prismic from "../../../src/module"

export default defineNuxtConfig({
	modules: [prismic],

	prismic: {
		endpoint: `nuxtjs-prismic`,
		clientConfig: {
			routes: [{ type: "kitchen_sink", path: "/kitchen-sink" }],
		},
	},
})

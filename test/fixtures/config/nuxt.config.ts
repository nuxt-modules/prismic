import prismic from "../../../src/module"

export default defineNuxtConfig({
	modules: [prismic],

	prismic: {
		endpoint: `test-fixture`,
	},
})

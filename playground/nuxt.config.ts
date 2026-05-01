export default defineNuxtConfig({
	modules: ["../src/module"],

	compatibilityDate: "2026-01-05",

	prismic: {
		imports: "all",
	}
})

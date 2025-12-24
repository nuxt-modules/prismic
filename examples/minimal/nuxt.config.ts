export default defineNuxtConfig({
	modules: ["@nuxtjs/prismic"],

	devtools: { enabled: true },

	compatibilityDate: "2025-12-24",

	prismic: {
		endpoint: "200629-sms-hoy",
	},
})

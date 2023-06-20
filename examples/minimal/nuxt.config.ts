// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	imports: { autoImport: true },

	devtools: { enabled: true },

	modules: ['@nuxtjs/prismic'],

	prismic: {
		endpoint: '200629-sms-hoy'
	}
})

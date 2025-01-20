// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/prismic'],
	devtools: { enabled: true },
	future: {
		compatibilityVersion: 4,
	},
	prismic: {
		endpoint: '200629-sms-hoy',
	},
})

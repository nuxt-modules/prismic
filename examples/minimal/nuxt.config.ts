// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/prismic'],
	devtools: { enabled: true },
	prismic: {
		endpoint: '200629-sms-hoy',
	},
})

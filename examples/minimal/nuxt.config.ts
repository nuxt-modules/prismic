// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/prismic'],
	prismic: {
		endpoint: '200629-sms-hoy',
	},
	devtools: { enabled: true },
})

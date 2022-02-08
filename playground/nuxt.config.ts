import { defineNuxtConfig } from 'nuxt3'
import PrismicModule from '../src/module'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	typescript: {
		strict: true
	},
	modules: [PrismicModule],
	prismic: {
		endpoint: '200629-sms-hoy'
	}
})

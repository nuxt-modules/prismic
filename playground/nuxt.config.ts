import { defineNuxtConfig } from 'nuxt'

import prismicModule from '../src/module'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	typescript: {
		strict: true
	},
	modules: [prismicModule],
	prismic: {
		endpoint: '200629-sms-hoy',
		clientConfig: {
			routes: [
				{
					type: 'kitchen_sink_2',
					path: '/'
				},
				{
					type: 'page',
					path: '/'
				}
			]
		}
	}
})

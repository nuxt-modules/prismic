// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	typescript: {
		strict: true
	},
	modules: ['../src/module'],
	runtimeConfig: {
		public: {
			prismic: {
				endpoint: '200629-sms-hoy'
			}
		}
	},
	prismic: {
		// endpoint: '200629-sms-hoy',
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

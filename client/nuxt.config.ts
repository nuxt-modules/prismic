import { resolve } from 'pathe'

export default defineNuxtConfig({
	ssr: false,
	modules: [
		'@nuxt/devtools-ui-kit'
	],
	devtools: { enabled: true },
	nitro: {
		output: {
			publicDir: resolve(__dirname, '../dist/client')
		}
	},
	app: {
		baseURL: '/__prismic-client'
	},
	devServer: {
		port: 3300
	}
})

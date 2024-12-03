import { resolve } from 'pathe'

export default defineNuxtConfig({
	modules: [
		'@nuxt/devtools-ui-kit',
	],
	ssr: false,
	app: {
		baseURL: '/__prismic-client',
	},
	devServer: {
		port: 3300,
	},
	nitro: {
		output: {
			publicDir: resolve(__dirname, '../dist/client'),
		},
	},
})

import { resolve } from 'node:path'

import { defineNuxtModule } from '@nuxt/kit'
import { startSubprocess } from '@nuxt/devtools-kit'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	modules: [
		'../src/module',
		/**
		 * Start a sub Nuxt Server for developing the client
		 *
		 * The terminal output can be found in the Terminals tab of the devtools.
		 */
		defineNuxtModule({
			setup(_, nuxt) {
				if (!nuxt.options.dev) {
					return
				}

				const subprocess = startSubprocess(
					{
						command: 'npx',
						args: ['nuxi', 'dev'],
						cwd: resolve(__dirname, '../client'),
					},
					{
						id: 'prismic:client',
						name: 'Prismic Client Dev',
					},
				)
				subprocess.getProcess().stdout?.on('data', (data) => {
					console.log(` - devtools: ${data.toString()}`)
				})
				subprocess.getProcess().stderr?.on('data', (data) => {
					console.error(` - devtools: ${data.toString()}`)
				})

				process.on('exit', () => {
					subprocess.terminate()
				})
			},
		}),
	],

	devtools: { enabled: true },

	runtimeConfig: {
		public: {
			prismic: {
				endpoint: '200629-sms-hoy',
			},
		},
	},

	future: {
		compatibilityVersion: 4,
	},

	compatibilityDate: '2025-01-02',

	typescript: { strict: true },

	prismic: {
		// endpoint: '200629-sms-hoy',
		clientConfig: {
			routes: [
				{
					type: 'kitchen_sink_2',
					path: '/',
				},
				{
					type: 'page',
					path: '/',
				},
			],
		},
	},
})

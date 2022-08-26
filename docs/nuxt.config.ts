import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
	extends: ['./node_modules/@docus/docs-theme'],
	app: {
		head: {
			meta: [
				{ name: 'og:title', content: 'Nuxt Prismic', hid: 'og:title' }
			]
		}
	},
	modules: ['@nuxthq/admin', '@docus/github', 'vue-plausible'],
	components: [
		{
			prefix: '',
			path: './components',
			global: true
		}
	],
	github: {
		owner: 'nuxt-modules',
		repo: 'prismic',
		branch: 'v3'
	},
	plausible: {
		domain: 'prismic.nuxtjs.org'
	},
	tailwindcss: {
		config: {
			theme: {
				extend: {
					colors: {
						primary: {
							50: '#f7f9f9',
							100: '#e8f0f7',
							200: '#ceddee',
							300: '#a2bcd8',
							400: '#7295bc',
							500: '#5163ba',
							600: '#485884',
							700: '#384265',
							800: '#272d46',
							900: '#111827'
						}
					}
				}
			}
		}
	}
})

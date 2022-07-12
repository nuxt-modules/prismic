import { defineNuxtConfig } from 'nuxt'

const confettiScripts = [
	{ src: 'https://cdn.jsdelivr.net/npm/js-confetti@0.8.0/dist/js-confetti.browser.js', body: true },
	{
		innerHTML: `
if (typeof JSConfetti !== "undefined") {
	new JSConfetti().addConfetti({
		emojis: ["🌲", "💚", "📚", "📐", "🚀"],
		emojiSize: 60,
	});
}
`,
		body: true
	}
]

export default defineNuxtConfig({
	extends: ['./node_modules/@docus/docs-theme'],
	app: {
		head: {
			script: [...confettiScripts],
			__dangerouslyDisableSanitizers: ['script']
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
		owner: 'nuxt-community',
		repo: 'prismic-module',
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

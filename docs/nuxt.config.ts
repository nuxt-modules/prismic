export default defineNuxtConfig({
	// https://github.com/nuxt-themes/docus
	extends: '@nuxt-themes/docus',

	modules: [
		// https://github.com/nuxt-modules/plausible
		'@nuxtjs/plausible',
		// https://github.com/nuxt/devtools
		'@nuxt/devtools',
	],

	components: [
		{
			prefix: '',
			path: './components',
			global: true,
		},
	],

	generate: {
		routes: ['/'],
	},

	compatibilityDate: '2025-01-13',

	plausible: {
		domain: 'prismic.nuxtjs.org',
	},
})

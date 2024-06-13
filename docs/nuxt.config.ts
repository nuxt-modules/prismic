export default defineNuxtConfig({
	// https://github.com/nuxt-themes/docus
	extends: '@nuxt-themes/docus',

	modules: [
		// https://github.com/nuxt-modules/plausible
		'@nuxtjs/plausible',
		// https://github.com/nuxt/devtools
		'@nuxt/devtools',
	],

	generate: {
		routes: ['/'],
	},

	components: [
		{
			prefix: '',
			path: './components',
			global: true,
		},
	],

	plausible: {
		domain: 'prismic.nuxtjs.org',
	},
})

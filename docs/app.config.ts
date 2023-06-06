export default defineAppConfig({
  docus: {
    title: 'Nuxt Prismic',
    description: 'Easily connect your Nuxt application to your content hosted on Prismic.',
		url: 'https://prismic.nuxtjs.org',
		image: 'https://prismic.nuxtjs.org/cover.jpg',
    socials: {
      twitter: 'nuxt_js',
      github: 'nuxt-modules/prismic'
    },
		header: {
			logo: true,
			showLinkIcon: true,
			exclude: [],
			fluid: true
		},
		main: {
			padded: true,
			fluid: true
		},
		aside: {
			level: 1,
			collapsed: false,
			exclude: []
		},
		footer: {
      iconLinks: [
        {
          href: 'https://nuxt.com',
          icon: 'IconNuxt'
        },
        {
          href: 'https://prismic.io',
          icon: 'IconPrismic'
        }
      ]
    },
		github: {
			dir: 'docs/content',
			branch: 'master',
			repo: 'prismic',
			owner: 'nuxt-modules',
			edit: true
		},
  }
})

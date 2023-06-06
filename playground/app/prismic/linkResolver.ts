import type * as prismic from '@prismicio/client'

const linkResolver: prismic.LinkResolverFunction<string | undefined> = (doc) => {
	if (doc.isBroken) {
		return '/404'
	}

	if (doc.type === 'page') {
		return `/${doc.uid}`
	}

	return '/'
}

export default linkResolver

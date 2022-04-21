import type * as prismicH from '@prismicio/helpers'

const linkResolver: prismicH.LinkResolverFunction<string | undefined> = (doc) => {
	if (doc.isBroken) {
		return '/404'
	}

	if (doc.type === 'page') {
		return `/${doc.uid}`
	}

	return '/baz'
}

export default linkResolver

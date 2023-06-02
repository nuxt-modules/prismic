import type * as prismic from '@prismicio/client'

const richTextSerializer: prismic.HTMLRichTextMapSerializer = {
	// Those are just examples, update them and add your own~
	heading1: ({ children }) => `<h2>${children}</h2>`,
	paragraph: ({ children }) => `<p class="fooBar">${children}</p>`
}

export default richTextSerializer

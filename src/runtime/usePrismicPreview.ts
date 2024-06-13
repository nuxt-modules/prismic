import { onMounted } from 'vue'

import { useRouter, usePrismic } from '#imports'

/**
 * Resolves Prismic previews on the preview entry page (`/preview`)
 *
 * @param defaultURL - The default URL to redirect to if the previewed document doesn't map to one.
 */
export const usePrismicPreview = (defaultURL = '/'): void => {
	const { client, options: { linkResolver } } = usePrismic()
	const { push } = useRouter()
	onMounted(async () => {
		const redirectURL = await client.resolvePreviewURL({
			linkResolver,
			defaultURL,
		})

		push(redirectURL)
	})
}

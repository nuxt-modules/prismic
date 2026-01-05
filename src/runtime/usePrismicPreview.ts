// @ts-expect-error - Proxy file
import { usePrismic, useRouter } from "#imports"
import { onMounted } from "vue"

/** Resolves Prismic previews on the preview entry page (`/preview`) */
export const usePrismicPreview = (defaultURL = "/"): void => {
	const { client, linkResolver } = usePrismic()
	const { push } = useRouter()
	onMounted(async () => {
		const redirectURL = await client.resolvePreviewURL({
			linkResolver,
			defaultURL,
		})

		push(redirectURL)
	})
}

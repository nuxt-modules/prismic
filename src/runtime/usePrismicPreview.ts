// @ts-expect-error - Proxy file
import { usePrismic, useRouter } from "#imports";
import { onMounted } from "vue";

/** Resolves Prismic previews on the preview entry page (`/preview`) */
export const usePrismicPreview = (defaultURL = "/"): void => {
	const { client, linkResolver } = usePrismic();
	const { push } = useRouter();
	onMounted(async () => {
		// Toolbar v5 follows this session. Store it before the redirect strips the URL, with the
		// toolbar's preview cookie attributes.
		const session = new URLSearchParams(location.search).get("session");
		if (session) {
			const sameSite =
				window.self !== window.top && window.isSecureContext
					? "None; Secure"
					: "Lax";
			document.cookie = `io.prismic.previewSession=${encodeURIComponent(session)}; Path=/; SameSite=${sameSite}`;
		}

		const redirectURL = await client.resolvePreviewURL({
			linkResolver,
			defaultURL,
		});

		push(redirectURL);
	});
};

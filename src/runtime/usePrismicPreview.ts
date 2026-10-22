// @ts-expect-error - Proxy file
import { usePrismic, useRouter } from "#imports";
import { cookie } from "@prismicio/client";
import { onMounted } from "vue";

/** Resolves Prismic previews on the preview entry page (`/preview`) */
export const usePrismicPreview = (defaultURL = "/"): void => {
	const { client, linkResolver } = usePrismic();
	const router = useRouter();
	onMounted(async () => {
		const params = new URLSearchParams(location.search);
		const session = params.get("session");
		const redirectURL = await client.resolvePreviewURL({
			linkResolver,
			defaultURL,
		});

		if (!session) {
			router.push(redirectURL);
			return;
		}

		// Toolbar v5 only starts on page load, with a session cookie. The preview cookie lets that
		// page render the draft right away.
		setCookie("io.prismic.previewSession", session);
		const token = params.get("token");
		if (token) setCookie(cookie.preview, token);
		location.replace(router.resolve(redirectURL).href);
	});
};

// Writes cookies like the toolbar: the client sends the raw value as the ref, so URL characters
// stay unescaped, and cross-site iframes like the editor's need `SameSite=None`.
function setCookie(name: string, value: string) {
	const encoded = encodeURIComponent(value).replace(
		/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
		decodeURIComponent,
	);
	const sameSite =
		window.self !== window.top && window.isSecureContext
			? "None; Secure"
			: "Lax";
	document.cookie = `${name}=${encoded}; Path=/; SameSite=${sameSite}`;
}

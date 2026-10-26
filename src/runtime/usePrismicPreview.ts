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
		// page render the draft right away. Share links carry the page to open in `path`.
		setCookie(cookie.previewSession, session);
		const token = params.get("token");
		if (token) setCookie(cookie.preview, token);
		location.replace(
			getSafePath(params.get("path")) ?? router.resolve(redirectURL).href,
		);
	});
};

/**
 * Returns `path` if it stays on the current origin, like `/blog?page=2#top`. It comes from
 * `location`, so it already includes the base URL.
 */
function getSafePath(path: string | null): string | undefined {
	if (
		!path?.startsWith("/") ||
		path.startsWith("//") ||
		path.startsWith("/\\")
	) {
		return;
	}

	const origin = "https://placeholder.invalid";
	const url = new URL(path, origin);
	const safePath = url.href.slice(origin.length);
	// Normalizing can create `//`, like with `/.//example.com`.
	if (url.origin === origin && !safePath.startsWith("//")) {
		return safePath;
	}
}

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

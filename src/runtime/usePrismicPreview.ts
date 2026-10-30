// @ts-expect-error - Proxy file
import { useCookie, usePrismic, useRouter } from "#imports";
import { cookie } from "@prismicio/client";
import { nextTick, onMounted } from "vue";

/** Resolves Prismic previews on the preview entry page (`/preview`) */
export const usePrismicPreview = (defaultURL = "/"): void => {
	const { client, linkResolver } = usePrismic();
	const router = useRouter();
	// Like the toolbar's cookies: cross-site iframes, like the editor's, need `SameSite=None`.
	const cookieOptions =
		import.meta.client && window.self !== window.top && window.isSecureContext
			? ({ sameSite: "none", secure: true } as const)
			: ({ sameSite: "lax" } as const);
	const previewCookie = useCookie(cookie.preview, cookieOptions);
	const sessionCookie = useCookie(cookie.previewSession, cookieOptions);
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
		sessionCookie.value = session;
		const token = params.get("token");
		if (token) previewCookie.value = token;
		// `useCookie` writes on the next tick.
		await nextTick();
		location.replace(
			getSafePath(params.get("path")) ?? router.resolve(redirectURL).href,
		);
	});
};

/**
 * Returns `path` if it stays on the current origin, like `/blog?page=2#top`. It comes from
 * `location`, so it already includes `app.baseURL`.
 */
function getSafePath(path: string | null | undefined): string | undefined {
	if (
		!path?.startsWith("/") ||
		path.startsWith("//") ||
		path.startsWith("/\\")
	) {
		return;
	}

	const origin = "https://placeholder.invalid";
	let url: URL;
	try {
		url = new URL(path, origin);
	} catch {
		return;
	}
	const safePath = url.href.slice(origin.length);
	// Normalizing can create `//`, like with `/.//example.com`.
	if (url.origin === origin && !safePath.startsWith("//")) {
		return safePath;
	}
}

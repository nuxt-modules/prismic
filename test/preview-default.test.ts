import { describe, expect, it } from "vitest";

import { fileURLToPath } from "node:url";

import { $fetch, createPage, setup, url } from "@nuxt/test-utils/e2e";

describe("default preview page and path", async () => {
	await setup({
		rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
		nuxtConfig: { app: { baseURL: "/base/" } },
		browser: true,
	});

	it("serves the default preview page at /preview", async () => {
		const html = await $fetch("/base/preview");
		expect(html).toContain("Loading preview...");
	});

	it("injects the Prismic toolbar v5 script", async () => {
		const html = await $fetch("/base/");
		expect(html).toContain(
			'src="https://static.cdn.prismic.io/prismic.js?repo=nuxtjs-prismic&v=5"',
		);
	});

	it("starts the toolbar with the preview session", async () => {
		const page = await createPage();
		// Like the toolbar, reads the cookies once, when the page loads.
		await page.route("https://static.cdn.prismic.io/**", (route) =>
			route.fulfill({
				body: "window.toolbarCookies = document.cookie",
				contentType: "text/javascript",
				headers: { "access-control-allow-origin": "*" },
			}),
		);
		// `navigate` fires when `location.replace()` is called, before the page unloads.
		await page.addInitScript(() => {
			type NavigateEvent = Event & { destination: { sameDocument: boolean } };
			const { navigation } = window as unknown as { navigation: EventTarget };
			navigation.addEventListener("navigate", (event) => {
				if ((event as NavigateEvent).destination.sameDocument) return;
				sessionStorage.setItem("navigateCookies", document.cookie);
			});
		});
		const loads: string[] = [];
		page.on("request", (request) => {
			if (request.isNavigationRequest()) loads.push(request.url());
		});

		const token = "https://nuxtjs-prismic.prismic.io/previews/abc:def?a=b";
		const cookies = [
			`io.prismic.preview=${encodeURIComponent(token)}`,
			"io.prismic.previewSession=abc~xyz",
		];
		const previewURL = url(
			`/base/preview?token=${encodeURIComponent(token)}&session=abc~xyz&path=${encodeURIComponent("/base/?shared#top")}`,
		);
		// Prerendered pages fetch the draft in the browser.
		const draftRequest = page.waitForRequest(
			(request) =>
				new URL(request.url()).searchParams.get("ref") ===
				encodeURIComponent(token),
		);
		await page.goto(previewURL);
		await page.waitForURL(url("/base/?shared#top"));

		await draftRequest;
		expect(loads).toEqual([previewURL, url("/base/?shared")]);
		const navigateCookies = await page.evaluate(() =>
			sessionStorage.getItem("navigateCookies"),
		);
		expect(navigateCookies?.split("; ").sort()).toEqual(cookies);
		const toolbarCookies = await page.waitForFunction(
			() => (window as { toolbarCookies?: string }).toolbarCookies,
		);
		expect((await toolbarCookies.jsonValue())?.split("; ").sort()).toEqual(
			cookies,
		);
	});

	it("ignores unsafe paths", async () => {
		for (const path of [
			"//example.com",
			"/\\example.com",
			"https://example.com",
			"//placeholder.invalid/",
			"/\t/example.com",
			"/.//example.com",
		]) {
			const page = await createPage();
			await page.route("https://static.cdn.prismic.io/**", (route) =>
				route.abort(),
			);
			const loads: string[] = [];
			page.on("request", (request) => {
				if (request.isNavigationRequest()) loads.push(request.url());
			});
			const previewURL = url(
				`/base/preview?token=ref&session=abc&path=${encodeURIComponent(path)}`,
			);
			await page.goto(previewURL);
			await page.waitForURL(url("/base/"));
			expect(loads).toEqual([previewURL, url("/base/")]);
		}
	});
});

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
			"https://static.cdn.prismic.io/prismic.js?new=true&repo=nuxtjs-prismic&v=5",
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
		const loads: string[] = [];
		page.on("request", (request) => {
			if (request.isNavigationRequest()) loads.push(request.url());
		});

		const token = "https://nuxtjs-prismic.prismic.io/previews/abc:def?a=b";
		const previewURL = url(
			`/base/preview?token=${encodeURIComponent(token)}&session=abc~xyz`,
		);
		await page.goto(previewURL);
		await page.waitForURL(url("/base/"));

		expect(loads).toEqual([previewURL, url("/base/")]);
		const cookies = await page.waitForFunction(
			() => (window as { toolbarCookies?: string }).toolbarCookies,
		);
		expect((await cookies.jsonValue())?.split("; ").sort()).toEqual([
			`io.prismic.preview=${token}`,
			"io.prismic.previewSession=abc~xyz",
		]);
	});
});

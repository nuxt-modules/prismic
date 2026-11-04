import { describe, expect, it } from "vitest";

import { fileURLToPath } from "node:url";

import { $fetch, createPage, setup, url } from "@nuxt/test-utils/e2e";

describe("custom preview page and path", async () => {
	await setup({
		rootDir: fileURLToPath(
			new URL("./fixtures/custom-preview", import.meta.url),
		),
		browser: true,
	});

	it("serves the default preview page at configured path", async () => {
		const html = await $fetch("/custom-preview");
		expect(html).toContain("Loading custom Prismic preview...");
		await expect($fetch("/preview")).rejects.toThrow("404");
	});

	it("injects the Prismic toolbar script", async () => {
		const html = await $fetch("/");
		expect(html).toContain("static.cdn.prismic.io/prismic.js");
	});

	it("loads the next page in full to start the toolbar", async () => {
		const page = await createPage();
		await page.route("https://static.cdn.prismic.io/**", (route) =>
			route.abort(),
		);
		const loads: string[] = [];
		page.on("request", (request) => {
			if (request.isNavigationRequest()) loads.push(request.url());
		});
		const previewURL = url("/custom-preview?token=ref&session=abc");
		await page.goto(previewURL);
		await page.waitForURL(url("/"));
		expect(loads).toEqual([previewURL, url("/")]);
	});
});

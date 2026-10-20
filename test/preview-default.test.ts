import { describe, expect, it } from "vitest";

import { fileURLToPath } from "node:url";

import { $fetch, createPage, setup, url } from "@nuxt/test-utils/e2e";

describe("default preview page and path", async () => {
	await setup({
		rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
		browser: true,
	});

	it("serves the default preview page at /preview", async () => {
		const html = await $fetch("/preview");
		expect(html).toContain("Loading preview...");
	});

	it("injects the Prismic toolbar v5 script", async () => {
		const html = await $fetch("/");
		expect(html).toContain(
			"https://static.cdn.prismic.io/prismic.js?new=true&repo=nuxtjs-prismic&v=5",
		);
	});

	it("stores the preview session", async () => {
		const page = await createPage();
		await page.route("https://static.cdn.prismic.io/**", (route) =>
			route.abort(),
		);
		await page.goto(url("/preview?token=ref&session=abc~xyz"));
		await page.waitForURL(url("/"));

		const cookies = await page.context().cookies();
		expect(cookies).toContainEqual(
			expect.objectContaining({
				name: "io.prismic.previewSession",
				value: "abc~xyz",
				path: "/",
				sameSite: "Lax",
				httpOnly: false,
			}),
		);
	});
});

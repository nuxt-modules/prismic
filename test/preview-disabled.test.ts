import { describe, expect, it } from "vitest";

import { fileURLToPath } from "node:url";

import { $fetch, fetch, setup } from "@nuxt/test-utils/e2e";

describe("disabled preview", async () => {
	await setup({
		rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
		nuxtConfig: {
			prismic: {
				preview: false,
				toolbar: false,
			},
		},
	});

	it("does not serve the preview page", async () => {
		await expect($fetch("/preview")).rejects.toThrow("404");
	});

	it("does not inject the Prismic toolbar script", async () => {
		const html = await $fetch("/");
		expect(html).not.toContain("static.cdn.prismic.io/prismic.js");
	});

	it("clears the preview session", async () => {
		const res = await fetch("/", {
			headers: {
				cookie: "io.prismic.previewSession=abc",
			},
		});
		expect(res.headers.getSetCookie()).toContainEqual(
			expect.stringMatching(/^io\.prismic\.previewSession=;.*Max-Age=0/),
		);
	});
});

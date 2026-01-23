import { describe, expect, it } from "vitest"

import { fileURLToPath } from "node:url"

import { $fetch, setup } from "@nuxt/test-utils/e2e"

describe("disabled preview", async () => {
	await setup({
		rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
		nuxtConfig: {
			prismic: {
				preview: false,
				toolbar: false,
			},
		},
	})

	it("does not serve the preview page", async () => {
		await expect($fetch("/preview")).rejects.toThrow("404")
	})

	it("does not inject the Prismic toolbar script", async () => {
		const html = await $fetch("/")
		expect(html).not.toContain("static.cdn.prismic.io/prismic.js")
	})
})

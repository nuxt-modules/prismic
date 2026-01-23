import { describe, expect, it } from "vitest"

import { fileURLToPath } from "node:url"

import { $fetch, setup } from "@nuxt/test-utils/e2e"

describe("custom preview page and path", async () => {
	await setup({
		rootDir: fileURLToPath(
			new URL("./fixtures/custom-preview", import.meta.url),
		),
	})

	it("serves the default preview page at configured path", async () => {
		const html = await $fetch("/custom-preview")
		expect(html).toContain("Loading custom Prismic preview...")
		await expect($fetch("/preview")).rejects.toThrow("404")
	})

	it("injects the Prismic toolbar script", async () => {
		const html = await $fetch("/")
		expect(html).toContain("static.cdn.prismic.io/prismic.js")
	})
})

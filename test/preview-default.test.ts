import { describe, expect, it } from "vitest"

import { fileURLToPath } from "node:url"

import { $fetch, setup } from "@nuxt/test-utils/e2e"

describe("default preview page and path", async () => {
	await setup({
		rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
	})

	it("serves the default preview page at /preview", async () => {
		const html = await $fetch("/preview")
		expect(html).toContain("Loading preview...")
	})

	it("injects the Prismic toolbar script", async () => {
		const html = await $fetch("/")
		expect(html).toContain("static.cdn.prismic.io/prismic.js")
	})
})

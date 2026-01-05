import { describe, expect, it } from "vitest"

import { fileURLToPath } from "node:url"

import { $fetch, setup } from "@nuxt/test-utils/e2e"

describe("proxy", async () => {
	await setup({
		rootDir: fileURLToPath(new URL("./fixtures/proxy", import.meta.url)),
	})

	it("client", async () => {
		const html = await $fetch("/")
		expect(html).toContain(`<div id="repository-name">nuxtjs-prismic</div>`)
	})

	it("richTextComponents", async () => {
		const html = await $fetch("/")
		expect(html.replace(/<!--.*?-->/g, "")).toContain(
			`<div id="rich-text"><p class="rich-text-components">Lorem ipsum dolor sit amet,`,
		)
	})

	it("linkResolver", async () => {
		const html = await $fetch("/")
		expect(html.replace(/<!--.*?-->/g, "")).toContain(
			`<div id="relationship"><a href="/link-resolver" class="">relationship</a>`,
		)
	})
})

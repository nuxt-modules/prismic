import { describe, expect, it } from "vitest"

import { fileURLToPath } from "node:url"

import { $fetch, setup } from "@nuxt/test-utils/e2e"

describe("components", async () => {
	await setup({
		rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
	})

	describe("renders rich text", () => {
		it("as plain text", async () => {
			const html = await $fetch("/")
			expect(html).toContain(`<div id="text">Hello world</div>`)
		})

		it("as rich text", async () => {
			const html = await $fetch("/")
			expect(html.replace(/<!--.*?-->/g, "")).toContain(
				`<div id="rich-text"><p>Lorem ipsum dolor sit amet,`,
			)
		})
	})

	it("renders images", async () => {
		const html = await $fetch("/")
		expect(html).toContain(
			`<div id="image"><img src="https://images.prismic.io/nuxtjs-prismic/aVtiWHNYClf9oxVA_doge.jpg?auto=format,compress" srcset="https://images.prismic.io/nuxtjs-prismic/aVtiWHNYClf9oxVA_doge.jpg?auto=format%2Ccompress&amp;width=640 640w, https://images.prismic.io/nuxtjs-prismic/aVtiWHNYClf9oxVA_doge.jpg?auto=format%2Ccompress&amp;width=828 828w, https://images.prismic.io/nuxtjs-prismic/aVtiWHNYClf9oxVA_doge.jpg?auto=format%2Ccompress&amp;width=1200 1200w, https://images.prismic.io/nuxtjs-prismic/aVtiWHNYClf9oxVA_doge.jpg?auto=format%2Ccompress&amp;width=2048 2048w, https://images.prismic.io/nuxtjs-prismic/aVtiWHNYClf9oxVA_doge.jpg?auto=format%2Ccompress&amp;width=3840 3840w" width="959" height="540"></div>`,
		)
	})

	it("renders links", async () => {
		const html = await $fetch("/")
		expect(html.replace(/<!--.*?-->/g, "")).toContain(
			`<div id="link"><a href="https://prismic.io/docs/nuxt" rel="noreferrer">link</a>`,
		)
	})

	it("renders relationships", async () => {
		const html = await $fetch("/")
		expect(html.replace(/<!--.*?-->/g, "")).toContain(
			`<div id="relationship"><a href="/kitchen-sink" class="">relationship</a>`,
		)
	})
})

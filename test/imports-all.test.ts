import { describe, expect, it } from "vitest"

import { fileURLToPath } from "node:url"

import { $fetch, setup } from "@nuxt/test-utils/e2e"

describe("imports: all", async () => {
	await setup({
		rootDir: fileURLToPath(new URL("./fixtures/imports-all", import.meta.url)),
	})

	describe("vue imports", () => {
		it("auto-imports PrismicText component", async () => {
			const html = await $fetch("/")
			expect(html).toContain(`<div id="text">Hello world</div>`)
		})

		it("auto-imports PrismicRichText component", async () => {
			const html = await $fetch("/")
			expect(html.replace(/<!--.*?-->/g, "")).toContain(
				`<div id="rich-text"><p>Lorem ipsum dolor sit amet,`,
			)
		})

		it("auto-imports PrismicImage component", async () => {
			const html = await $fetch("/")
			expect(html).toContain(
				`<div id="image"><img src="https://images.prismic.io/`,
			)
		})

		it("auto-imports usePrismic composable", async () => {
			const html = await $fetch("/")
			expect(html).toContain(`<div id="repository-name">nuxtjs-prismic</div>`)
		})
	})

	describe("javascript imports", () => {
		it("auto-imports asText function", async () => {
			const html = await $fetch("/")
			expect(html).toContain(`<div id="as-text">Hello world</div>`)
		})

		it("auto-imports asLink function", async () => {
			const html = await $fetch("/")
			expect(html).toContain(
				`<div id="as-link">https://prismic.io/docs/nuxt</div>`,
			)
		})
	})
})

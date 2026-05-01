import { describe, expect, it } from "vitest"

import { fileURLToPath } from "node:url"

import { $fetch, setup } from "@nuxt/test-utils/e2e"

describe("prismic.config.json overrides", async () => {
	await setup({
		rootDir: fileURLToPath(
			new URL("./fixtures/config-file-overrides", import.meta.url),
		),
	})

	it("uses nuxt config over the repository name from prismic.config.json", async () => {
		const html = await $fetch("/")

		expect(html).toContain(
			`<div id="repository-name">nuxt-config-repository</div>`,
		)
		expect(html).toContain(`<div id="routes-count">1</div>`)
		expect(html).toContain(`<div id="route-path">/:uid</div>`)
	})
})

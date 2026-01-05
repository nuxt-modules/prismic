import { describe, expect, it } from "vitest"

import { fileURLToPath } from "node:url"

import { $fetch, setup } from "@nuxt/test-utils/e2e"

describe("environment", async () => {
	await setup({
		rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
		env: {
			NUXT_PUBLIC_PRISMIC_ENDPOINT: "runtime-config",
			NUXT_PUBLIC_PRISMIC_ENVIRONMENT: "runtime-config-environment",
		},
	})

	it("overrides repository name from environment", async () => {
		const html = await $fetch("/")
		expect(html).toContain(
			`<div id="repository-name">runtime-config-environment</div>`,
		)
	})
})

import { describe, expect, it } from "vitest"

import { fileURLToPath } from "node:url"

import { $fetch, setup } from "@nuxt/test-utils/e2e"

describe("config", async () => {
	await setup({
		rootDir: fileURLToPath(new URL("./fixtures/config", import.meta.url)),
	})

	it("configures a client with the provided repository name", async () => {
		const html = await $fetch("/")
		expect(html).toContain("<div>test-fixture</div>")
	})
})

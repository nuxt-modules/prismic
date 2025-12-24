import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		typecheck: {
			enabled: true,
			checker: "vue-tsc",
		},
		coverage: {
			provider: "v8",
			reporter: ["lcovonly", "text"],
			include: ["src"],
			exclude: ["src/**/*.vue"],
		},
	},
})

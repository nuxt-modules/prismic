import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			reporter: ['lcovonly', 'text'],
			include: ['src'],
		},
		setupFiles: ['./test/__setup__.ts'],
	},
})

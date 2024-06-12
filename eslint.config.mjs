// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
	features: {
		// Rules for module authors
		tooling: true,
		// Rules for formatting
		stylistic: true,
	},
	dirs: {
		src: [
			'./examples/minimal',
			'./playground/app',
			'./client',
			'./docs',
		],
	},
})
	.append(
		{
			rules: {
				'@stylistic/no-tabs': ['error', { allowIndentationTabs: true }],
				'@stylistic/indent': ['error', 'tab'],
			},
		},
		{
			files: ['docs/**/*.vue'],
			rules: {
				'vue/multi-word-component-names': 'off',
			},
		},
	)

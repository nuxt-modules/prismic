import { join } from 'path'
import { existsSync } from 'fs'
import { defineNuxtModule, createResolver, addPlugin, addAutoImport, addComponent, extendPages } from '@nuxt/kit'

import * as prismicVue from '@prismicio/vue'

import { name as pkgName, version as pkgVersion } from '../package.json'
import { PrismicModuleOptions } from './types'
import { logger } from './logger'

export { PrismicModuleOptions } from './types'
export { PrismicModuleOptions as ModuleOptions } from './types'

export default defineNuxtModule<PrismicModuleOptions>({
	meta: {
		name: pkgName,
		version: pkgVersion,
		configKey: 'prismic',
		compatibility: { nuxt: '^3.0.0' }
	},
	defaults: {
		endpoint: '',
		clientConfig: {},
		linkResolver: undefined,
		htmlSerializer: undefined,
		injectComponents: true,
		components: {},
		preview: '/preview'
	},
	hooks: {},
	setup(mergedOptions, nuxt) {
		if (!mergedOptions.client && !mergedOptions.endpoint) {
			logger.warn('Options `endpoint` or `client` are required, disabling module...')
			return
		}

		// Runtime dir boilerplate
		const resolver = createResolver(import.meta.url)
		nuxt.options.build.transpile.push(resolver.resolve('runtime'))

		// Expose options through public runtime config
		nuxt.options.publicRuntimeConfig ||= {} as typeof nuxt.options.publicRuntimeConfig
		nuxt.options.publicRuntimeConfig[pkgName] = mergedOptions

		// Add plugin
		addPlugin(resolver.resolve('runtime/plugin'))

		// Add components auto import
		if (mergedOptions.injectComponents) {
			[
				'PrismicEmbed',
				'PrismicImage',
				'PrismicLink',
				'PrismicText',
				'PrismicRichText',
				'SliceZone'
			].forEach((component) => {
				addComponent({
					name: component,
					export: component,
					filePath: '@prismicio/vue'
				})
			})
		}

		// Add composable auto import
		const composableAutoImports = Object
			.keys(prismicVue)
			.filter(key => key.startsWith('use'))
			.map((key) => {
				return {
					name: key,
					as: key,
					from: '@prismicio/vue'
				}
			})
		addAutoImport(composableAutoImports)

		// Add preview route
		if (mergedOptions.preview) {
			const userPreviewPagePath = join(nuxt.options.srcDir, nuxt.options.dir.pages, `${mergedOptions.preview}.vue`)

			if (existsSync(userPreviewPagePath)) {
				logger.info(`Using user-defined preview page at \`${userPreviewPagePath.replace(join(nuxt.options.rootDir), '~~').replace(/\\/g, '/')
					}\`, available at \`${mergedOptions.preview}\``)
			} else {
				logger.info(`Using default preview page, available at \`${mergedOptions.preview}\``)

				extendPages((pages) => {
					pages.unshift({
						name: 'prismic-preview',
						path: mergedOptions.preview as string, // Checked before
						file: resolver.resolve('runtime/preview.vue')
					})
				})
			}

			// TODO: Refactor with new client helpers
			let repositoryName = ''
			if (mergedOptions.client) {
				repositoryName = new URL(mergedOptions.client.endpoint).host.split('.')[0]
			} else {
				try {
					repositoryName = new URL(mergedOptions.endpoint).host.split('.')[0]
				} catch (error) {
					repositoryName = mergedOptions.endpoint
				}
			}

			// Add toolbar
			nuxt.options.meta ||= {}
			nuxt.options.meta.script ||= []
			nuxt.options.meta.script.push({
				src: `https://static.cdn.prismic.io/prismic.min.js?repo=${repositoryName}&new=true`
			})
		}
	}
})

import { join } from 'node:path'

import {
	defineNuxtModule,
	createResolver,
	addTemplate,
	addPlugin,
	addAutoImport,
	addComponent,
	extendPages
} from '@nuxt/kit'
import { cleanDoubleSlashes } from 'ufo'

import { isRepositoryEndpoint, getRepositoryName } from '@prismicio/client'
import * as prismicVue from '@prismicio/vue'

import { name as pkgName, version as pkgVersion } from '../package.json'
import { logger, fileExists } from './lib'
import type { PrismicModuleOptions } from './types'

// Options export
export type { PrismicModuleOptions } from './types'
export type { PrismicModuleOptions as ModuleOptions } from './types'

// Module export
export default defineNuxtModule<PrismicModuleOptions>({
	meta: {
		name: pkgName,
		version: pkgVersion,
		configKey: 'prismic',
		compatibility: { nuxt: '^3.0.0-rc.9' }
	},
	defaults: nuxt => ({
		endpoint: '',
		clientConfig: {},
		client: cleanDoubleSlashes(`~/${nuxt.options.dir.app}/prismic/client`),
		linkResolver: cleanDoubleSlashes(`~/${nuxt.options.dir.app}/prismic/linkResolver`),
		htmlSerializer: cleanDoubleSlashes(`~/${nuxt.options.dir.app}/prismic/htmlSerializer`),
		injectComponents: true,
		components: {},
		preview: '/preview',
		toolbar: true
	}),
	hooks: {},
	setup (mergedOptions, nuxt) {
		if (!mergedOptions.endpoint) {
			logger.warn('Options `endpoint` is required, disabling module...')
			return
		}

		// Runtime dir boilerplate
		const resolver = createResolver(import.meta.url)
		nuxt.options.build.transpile.push(resolver.resolve('runtime'), '@nuxtjs/prismic', '@prismicio/vue')

		// Add runtime user code
		const proxyUserFileWithUndefinedFallback = (filename: string, path: string, extensions = ['js', 'mjs', 'ts']) => {
			const resolvedFilename = `prismic/proxy/${filename}.ts`
			const resolvedPath = path.replace(/^(~~|@@)/, nuxt.options.rootDir).replace(/^(~|@)/, nuxt.options.srcDir)
			const maybeUserFile = fileExists(resolvedPath, extensions)

			if (maybeUserFile) {
				// If user file exists, proxy it with vfs
				logger.info(`Using user-defined \`${filename}\` at \`${maybeUserFile.replace(nuxt.options.srcDir, '~').replace(nuxt.options.rootDir, '~~').replace(/\\/g, '/')}\``)

				addTemplate({
					filename: resolvedFilename,
					getContents: () => `export { default } from '${path}'`
				})
			} else {
				// Else provide `undefined` fallback
				addTemplate({
					filename: resolvedFilename,
					getContents: () => 'export default undefined'
				})
			}
		}
		proxyUserFileWithUndefinedFallback('client', mergedOptions.client!)
		proxyUserFileWithUndefinedFallback('linkResolver', mergedOptions.linkResolver!)
		proxyUserFileWithUndefinedFallback('htmlSerializer', mergedOptions.htmlSerializer!)

		// Expose options through public runtime config
		nuxt.options.runtimeConfig.public ||= {} as typeof nuxt.options.runtimeConfig.public
		nuxt.options.runtimeConfig.public[pkgName] = mergedOptions

		// Add plugin
		addPlugin(resolver.resolve('runtime/plugin'))
		addPlugin(resolver.resolve('runtime/plugin.client'))

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
		addAutoImport({
			name: 'usePrismicPreview',
			as: 'usePrismicPreview',
			from: resolver.resolve('runtime/usePrismicPreview')
		})

		// Add preview route
		if (mergedOptions.preview) {
			const maybeUserPreviewPage = fileExists(join(nuxt.options.srcDir, nuxt.options.dir.pages, mergedOptions.preview), ['js', 'ts', 'vue'])

			if (maybeUserPreviewPage) {
				logger.info(`Using user-defined preview page at \`${maybeUserPreviewPage.replace(join(nuxt.options.srcDir), '~').replace(nuxt.options.rootDir, '~~').replace(/\\/g, '/')
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

			if (!mergedOptions.toolbar) {
				logger.warn('`toolbar` option is disabled but `preview` is enabled. Previews won\'t work unless you manually load the toolbar.')
			}
		}

		if (mergedOptions.toolbar) {
			// Add toolbar
			const repositoryName = isRepositoryEndpoint(mergedOptions.endpoint)
				? getRepositoryName(mergedOptions.endpoint)
				: mergedOptions.endpoint
			nuxt.options.app.head ||= {}
			nuxt.options.app.head.script ||= []
			nuxt.options.app.head.script.push({
				hid: 'prismic-preview',
				src: `https://static.cdn.prismic.io/prismic.min.js?repo=${repositoryName}&new=true`,
				async: true,
				defer: true
			})
		}
	}
})

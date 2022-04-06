import { join } from 'path'

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
import type { PrismicModuleOptions } from './types'
import { fileExists } from './utils'
import { logger } from './logger'

// Options export
export type { PrismicModuleOptions } from './types'
export type { PrismicModuleOptions as ModuleOptions } from './types'

// Module export
export default defineNuxtModule<PrismicModuleOptions>({
	meta: {
		name: pkgName,
		version: pkgVersion,
		configKey: 'prismic',
		compatibility: { nuxt: '^3.0.0' }
	},
	defaults: nuxt => ({
		endpoint: '',
		clientConfig: {},
		client: cleanDoubleSlashes(`~/${nuxt.options.dir.app}/prismic/client`),
		linkResolver: cleanDoubleSlashes(`~/${nuxt.options.dir.app}/prismic/linkResolver`),
		htmlSerializer: undefined,
		injectComponents: true,
		components: {},
		preview: '/preview'
	}),
	hooks: {},
	setup(mergedOptions, nuxt) {
		if (!mergedOptions.endpoint) {
			logger.warn('Options `endpoint` is required, disabling module...')
			return
		}

		// Runtime dir boilerplate
		const resolver = createResolver(import.meta.url)
		nuxt.options.build.transpile.push(resolver.resolve('runtime'), "@prismicio/vue")

		// Add runtime user code
		const addUserFileWithUndefinedFallback = (filename: string, path?: string, extensions = ['js', 'ts']) => {
			const resolvedFilename = `prismic/${filename}.ts`
			const resolvedPath = path
				? path.replace(/^(~~|@@)/, nuxt.options.rootDir).replace(/^(~|@)/, nuxt.options.srcDir)
				: undefined
			const maybeUserFile = fileExists(resolvedPath, extensions)

			if (maybeUserFile) {
				logger.info(`Using user-defined \`${filename}\` at \`${maybeUserFile.replace(nuxt.options.srcDir, '~').replace(/\\/g, '/')}\``)

				addTemplate({
					filename: resolvedFilename,
					src: maybeUserFile
				})
			} else {
				addTemplate({
					filename: resolvedFilename,
					getContents: () => 'export default undefined'
				})
			}
		}
		addUserFileWithUndefinedFallback('client', mergedOptions.client)
		addUserFileWithUndefinedFallback('linkResolver', mergedOptions.linkResolver)

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
			const maybeUserPreviewPage = fileExists(join(nuxt.options.srcDir, nuxt.options.dir.pages, mergedOptions.preview), ['js', 'ts', 'vue'])

			if (maybeUserPreviewPage) {
				logger.info(`Using user-defined preview page at \`${maybeUserPreviewPage.replace(join(nuxt.options.srcDir), '~').replace(/\\/g, '/')
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

			// Add toolbar
			const repositoryName = isRepositoryEndpoint(mergedOptions.endpoint)
				? getRepositoryName(mergedOptions.endpoint)
				: mergedOptions.endpoint
			nuxt.options.head ||= {}
			nuxt.options.head.script ||= []
			nuxt.options.head.script.push({
				src: `https://static.cdn.prismic.io/prismic.min.js?repo=${repositoryName}&new=true`
			})
		}
	}
})

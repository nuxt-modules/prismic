import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, addAutoImport } from '@nuxt/kit'

import * as prismicVue from '@prismicio/vue'

import { name as pkgName } from '../package.json'
import { PrismicModuleOptions } from './types'

export default defineNuxtModule<PrismicModuleOptions>({
	meta: {
		name: pkgName,
		configKey: 'prismic',
		compatibility: { nuxt: '^3.0.0' }
	},
	defaults: {
		endpoint: '',
		clientConfig: {},
		linkResolver: undefined,
		htmlSerializer: undefined,
		injectComponents: true,
		components: {
			linkInternalComponent: 'nuxt-link'
		}
	},
	hooks: {},
	setup (mergedOptions, nuxt) {
		const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
		nuxt.options.build.transpile.push(runtimeDir)

		nuxt.options.publicRuntimeConfig ||= {}
		nuxt.options.publicRuntimeConfig[pkgName] = mergedOptions

		addPlugin(resolve(runtimeDir, 'plugin'))

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
	}
})

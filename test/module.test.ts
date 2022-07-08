import { it, expect, vi } from 'vitest'
import mockFS from 'mock-fs'

import { addTemplate } from '@nuxt/kit'
import { Nuxt } from '@nuxt/schema'

import prismicModule, { ModuleOptions } from '../src/module'
import { logger } from '../src/lib'

const mockedNuxt = {
	options: {
		rootDir: '/tmp/nuxt',
		srcDir: '/tmp/nuxt',
		dir: { app: 'app', pages: 'pages' },
		build: { transpile: [] },
		runtimeConfig: {},
		app: {}
	},
	version: '3.0.0'
} as unknown as Nuxt

vi.mock('../src/lib/logger.ts', () => ({
	logger: { info: vi.fn(), warn: vi.fn() }
}))

vi.mock('@nuxt/kit', async () => {
	const kit: Record<string, unknown> = await vi.importActual('@nuxt/kit')

	return {
		...kit,
		defineNuxtModule: definition => (options = {}) => {
			const mergedOptions = {
				...definition.defaults(mockedNuxt),
				...{ endpoint: 'qwerty' },
				...options
			}

			return definition.setup(mergedOptions, mockedNuxt)
		},
		addTemplate: vi.fn(),
		addPlugin: vi.fn(),
		addAutoImport: vi.fn(),
		addComponent: vi.fn(),
		extendPages: vi.fn()
	}
})

const mockedPrismicModule = prismicModule as unknown as (options?: Partial<ModuleOptions>) => void

it('warns and returns early if endpoint if not provided', () => {
	mockedPrismicModule({ endpoint: '' })

	expect(logger.warn).toHaveBeenCalledOnce()
	expect(logger.warn).toHaveBeenCalledWith('Options `endpoint` is required, disabling module...')

	vi.clearAllMocks()
})

it('proxies nothing if user files are not available', () => {
	mockedPrismicModule()

	expect(addTemplate).toHaveBeenCalledTimes(3)
	// @ts-expect-error - Mocked type is wrong
	expect(addTemplate.calls.map(([options]) => [options.filename, options.getContents()])).toMatchInlineSnapshot(`
		[
		  [
		    "prismic/proxy/client.ts",
		    "export default undefined",
		  ],
		  [
		    "prismic/proxy/linkResolver.ts",
		    "export default undefined",
		  ],
		  [
		    "prismic/proxy/htmlSerializer.ts",
		    "export default undefined",
		  ],
		]
	`)

	vi.clearAllMocks()
})

it('proxies user files from default location', () => {
	mockFS({
		'/tmp/nuxt/app/prismic/client.ts': '',
		'/tmp/nuxt/app/prismic/linkResolver.ts': '',
		'/tmp/nuxt/app/prismic/htmlSerializer.ts': ''
	})

	mockedPrismicModule()

	expect(addTemplate).toHaveBeenCalledTimes(3)
	// @ts-expect-error - Mocked type is wrong
	expect(addTemplate.calls.map(([options]) => [options.filename, options.getContents()])).toMatchInlineSnapshot(`
		[
		  [
		    "prismic/proxy/client.ts",
		    "export { default } from '~/app/prismic/client'",
		  ],
		  [
		    "prismic/proxy/linkResolver.ts",
		    "export { default } from '~/app/prismic/linkResolver'",
		  ],
		  [
		    "prismic/proxy/htmlSerializer.ts",
		    "export { default } from '~/app/prismic/htmlSerializer'",
		  ],
		]
	`)

	vi.clearAllMocks()
	mockFS.restore()
})

it('proxies user files from provided location', () => {
	mockFS({
		'/tmp/nuxt/custom/client.ts': '',
		'/tmp/nuxt/custom/linkResolver.ts': '',
		'/tmp/nuxt/custom/htmlSerializer.ts': ''
	})

	mockedPrismicModule({
		client: '~/custom/client',
		linkResolver: '~/custom/linkResolver',
		htmlSerializer: '~/custom/htmlSerializer'
	})

	expect(addTemplate).toHaveBeenCalledTimes(3)
	// @ts-expect-error - Mocked type is wrong
	expect(addTemplate.calls.map(([options]) => [options.filename, options.getContents()])).toMatchInlineSnapshot(`
		[
		  [
		    "prismic/proxy/client.ts",
		    "export { default } from '~/custom/client'",
		  ],
		  [
		    "prismic/proxy/linkResolver.ts",
		    "export { default } from '~/custom/linkResolver'",
		  ],
		  [
		    "prismic/proxy/htmlSerializer.ts",
		    "export { default } from '~/custom/htmlSerializer'",
		  ],
		]
	`)

	vi.clearAllMocks()
	mockFS.restore()
})

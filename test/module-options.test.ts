import { it, expect, vi, beforeEach, afterEach } from 'vitest'

import { name as pkgName } from '../package.json'
import prismicModule from '../src/module'

import { mockModule } from './__testutils__/mockModule'

const mockedPrismicModule = mockModule(prismicModule)

beforeEach(() => {
	vi.mock('../src/lib/logger.ts', () => ({
		logger: { info: vi.fn(), warn: vi.fn() }
	}))
	vi.mock('@nuxt/kit', async () => {
		const { mockedNuxtKit } = await vi.importActual('./__testutils__/mockedNuxtKit')

		return mockedNuxtKit()
	})
})

afterEach(() => {
	vi.restoreAllMocks()
})

it('transpiles dependencies', () => {
	const { nuxt } = mockedPrismicModule({ endpoint: 'qwerty' })

	expect([(nuxt.options.build.transpile[0] as string).endsWith('src/runtime'), ...nuxt.options.build.transpile.slice(1)]).toMatchInlineSnapshot(`
		[
		  true,
		  "@nuxtjs/prismic",
		  "@prismicio/vue",
		]
	`)
})

it('exposes options in runtime config', () => {
	const { nuxt } = mockedPrismicModule({ endpoint: 'qwerty' })

	expect(nuxt.options.runtimeConfig.public[pkgName]).toMatchInlineSnapshot(`
		{
		  "client": "~/app/prismic/client",
		  "clientConfig": {},
		  "components": {},
		  "endpoint": "qwerty",
		  "htmlSerializer": "~/app/prismic/htmlSerializer",
		  "injectComponents": true,
		  "linkResolver": "~/app/prismic/linkResolver",
		  "preview": "/preview",
		  "toolbar": true,
		}
	`)
})

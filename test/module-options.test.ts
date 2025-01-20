import { it, expect, vi, afterEach } from 'vitest'

import prismicModule from '../src/module'

import { mockModule } from './__testutils__/mockModule'

const mockedPrismicModule = mockModule(prismicModule)

vi.mock('../src/lib/logger.ts', () => ({
	logger: { info: vi.fn(), warn: vi.fn() },
}))
vi.mock('@nuxt/kit', async () => {
	const { mockedNuxtKit } = await vi.importActual<typeof import('./__testutils__/mockedNuxtKit')>('./__testutils__/mockedNuxtKit')

	return mockedNuxtKit()
})

afterEach(() => {
	vi.clearAllMocks()
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

	expect(nuxt.options.runtimeConfig.public.prismic).toMatchInlineSnapshot(`
		{
		  "client": "~/app/prismic/client",
		  "clientConfig": {},
		  "components": {
		    "linkRel": "~/app/prismic/linkRel",
		    "richTextComponents": "~/app/prismic/richTextComponents",
		    "sliceZoneDefaultComponent": "~/app/prismic/sliceZoneDefaultComponent",
		  },
		  "devtools": true,
		  "endpoint": "qwerty",
		  "environment": "",
		  "injectComponents": true,
		  "linkResolver": "~/app/prismic/linkResolver",
		  "preview": "/preview",
		  "richTextSerializer": "~/app/prismic/richTextSerializer",
		  "toolbar": true,
		}
	`)
})

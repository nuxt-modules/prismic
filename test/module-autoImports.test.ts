import { it, expect, vi, afterEach } from 'vitest'

import { addImports, addComponent } from '@nuxt/kit'

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

it('auto-imports components', () => {
	mockedPrismicModule({ endpoint: 'qwerty' })

	expect(addComponent).toHaveBeenCalledTimes(7)
	expect(vi.mocked(addComponent).mock.calls.flat().map(options => [options.name, options.export, options.filePath])).toMatchInlineSnapshot(`
		[
		  [
		    "PrismicEmbed",
		    "PrismicEmbed",
		    "@prismicio/vue",
		  ],
		  [
		    "PrismicImage",
		    "PrismicImage",
		    "@prismicio/vue",
		  ],
		  [
		    "PrismicLink",
		    "PrismicLink",
		    "@prismicio/vue",
		  ],
		  [
		    "PrismicText",
		    "PrismicText",
		    "@prismicio/vue",
		  ],
		  [
		    "PrismicRichText",
		    "PrismicRichText",
		    "@prismicio/vue",
		  ],
		  [
		    "PrismicTable",
		    "PrismicTable",
		    "@prismicio/vue",
		  ],
		  [
		    "SliceZone",
		    "SliceZone",
		    "@prismicio/vue",
		  ],
		]
	`)
})

it('doesn\'t auto-import component when `injectComponents` is `false`', () => {
	mockedPrismicModule({ endpoint: 'qwerty', injectComponents: false })

	expect(addComponent).not.toHaveBeenCalled()
})

it('auto-imports', () => {
	mockedPrismicModule({ endpoint: 'qwerty' })

	expect(addImports).toHaveBeenCalledTimes(2)
	expect(vi.mocked(addImports).mock.calls.flat(2).map(options => [options.name, options.as])).toMatchInlineSnapshot(`
		[
		  [
		    "usePrismic",
		    "usePrismic",
		  ],
		  [
		    "getSliceComponentProps",
		    "getSliceComponentProps",
		  ],
		  [
		    "defineSliceZoneComponents",
		    "defineSliceZoneComponents",
		  ],
		  [
		    "getRichTextComponentProps",
		    "getRichTextComponentProps",
		  ],
		  [
		    "getTableComponentProps",
		    "getTableComponentProps",
		  ],
		  [
		    "usePrismicPreview",
		    "usePrismicPreview",
		  ],
		]
	`)
})

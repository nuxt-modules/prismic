import { it, expect, vi, beforeEach, afterEach } from 'vitest'

import { addImports, addComponent } from '@nuxt/kit'

import prismicModule from '../src/module'

import { mockModule } from './__testutils__/mockModule'

const mockedPrismicModule = mockModule(prismicModule)

beforeEach(() => {
	vi.mock('../src/lib/logger.ts', () => ({
		logger: { info: vi.fn(), warn: vi.fn() }
	}))
	vi.mock('@nuxt/kit', async () => {
		const { mockedNuxtKit } = await vi.importActual<any>('./__testutils__/mockedNuxtKit')

		return mockedNuxtKit()
	})
})

afterEach(() => {
	vi.restoreAllMocks()
})

it('auto-imports components', () => {
	mockedPrismicModule({ endpoint: 'qwerty' })

	expect(addComponent).toHaveBeenCalledTimes(6)
	// @ts-expect-error - Mocked type is wrong
	expect(addComponent.calls.flat().map(options => [options.name, options.export, options.filePath])).toMatchInlineSnapshot(`
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
	// @ts-expect-error - Mocked type is wrong
	expect(addImports.calls.flat(2).map(options => [options.name, options.as])).toMatchInlineSnapshot(`
		[
		  [
		    "useAllPrismicDocumentsByEveryTag",
		    "useAllPrismicDocumentsByEveryTag",
		  ],
		  [
		    "useAllPrismicDocumentsByIDs",
		    "useAllPrismicDocumentsByIDs",
		  ],
		  [
		    "useAllPrismicDocumentsBySomeTags",
		    "useAllPrismicDocumentsBySomeTags",
		  ],
		  [
		    "useAllPrismicDocumentsByTag",
		    "useAllPrismicDocumentsByTag",
		  ],
		  [
		    "useAllPrismicDocumentsByType",
		    "useAllPrismicDocumentsByType",
		  ],
		  [
		    "useAllPrismicDocumentsByUIDs",
		    "useAllPrismicDocumentsByUIDs",
		  ],
		  [
		    "useFirstPrismicDocument",
		    "useFirstPrismicDocument",
		  ],
		  [
		    "usePrismic",
		    "usePrismic",
		  ],
		  [
		    "usePrismicDocumentByID",
		    "usePrismicDocumentByID",
		  ],
		  [
		    "usePrismicDocumentByUID",
		    "usePrismicDocumentByUID",
		  ],
		  [
		    "usePrismicDocuments",
		    "usePrismicDocuments",
		  ],
		  [
		    "usePrismicDocumentsByEveryTag",
		    "usePrismicDocumentsByEveryTag",
		  ],
		  [
		    "usePrismicDocumentsByIDs",
		    "usePrismicDocumentsByIDs",
		  ],
		  [
		    "usePrismicDocumentsBySomeTags",
		    "usePrismicDocumentsBySomeTags",
		  ],
		  [
		    "usePrismicDocumentsByTag",
		    "usePrismicDocumentsByTag",
		  ],
		  [
		    "usePrismicDocumentsByType",
		    "usePrismicDocumentsByType",
		  ],
		  [
		    "usePrismicDocumentsByUIDs",
		    "usePrismicDocumentsByUIDs",
		  ],
		  [
		    "usePrismicImage",
		    "usePrismicImage",
		  ],
		  [
		    "usePrismicLink",
		    "usePrismicLink",
		  ],
		  [
		    "usePrismicRichText",
		    "usePrismicRichText",
		  ],
		  [
		    "usePrismicText",
		    "usePrismicText",
		  ],
		  [
		    "useSinglePrismicDocument",
		    "useSinglePrismicDocument",
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
		    "usePrismicPreview",
		    "usePrismicPreview",
		  ],
		]
	`)
})

// TODO: This test file will need to be refactored with @nuxt/test-utils to run plugins.

import { it, expect, vi, afterEach } from 'vitest'

import prismicModule from '../src/module'

import { mockModule } from './__testutils__/mockModule'

const mockedPrismicModule = mockModule(prismicModule)

vi.mock('../src/lib/logger.ts', () => ({
	logger: { info: vi.fn(), warn: vi.fn() }
}))
vi.mock('@nuxt/kit', async () => {
	const { mockedNuxtKit } = await vi.importActual<typeof import('./__testutils__/mockedNuxtKit')>('./__testutils__/mockedNuxtKit')

	return mockedNuxtKit()
})

afterEach(() => {
	vi.clearAllMocks()
})

it.skip('injects toolbar from repository name', () => {
	const { nuxt } = mockedPrismicModule({ endpoint: 'qwerty' })

	expect(nuxt.options.app.head.script?.find(scripts => (scripts as any).hid === 'prismic-preview')).toMatchInlineSnapshot(`
		{
		  "async": true,
		  "defer": true,
		  "hid": "prismic-preview",
		  "src": "https://static.cdn.prismic.io/prismic.min.js?repo=qwerty&new=true",
		}
	`)
})

it.skip('injects toolbar from repository endpoint', () => {
	const { nuxt } = mockedPrismicModule({ endpoint: 'https://qwerty.cdn.prismic.io/api/v2' })

	expect(nuxt.options.app.head.script?.find(scripts => (scripts as any).hid === 'prismic-preview')).toMatchInlineSnapshot(`
		{
		  "async": true,
		  "defer": true,
		  "hid": "prismic-preview",
		  "src": "https://static.cdn.prismic.io/prismic.min.js?repo=qwerty&new=true",
		}
	`)
})

it('doesn\'t inject toolbar when `toolbar` is `false`', () => {
	const { nuxt } = mockedPrismicModule({ endpoint: 'qwerty', toolbar: false })

	expect(nuxt.options.app.head.script?.find(scripts => (scripts as any).hid === 'prismic-preview')).toBeUndefined()
})

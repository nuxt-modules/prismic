import { it, expect, vi, afterEach } from 'vitest'
import mockFS from 'mock-fs'

import { addTemplate } from '@nuxt/kit'

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

it('proxies nothing if user files are not available', () => {
	mockedPrismicModule({ endpoint: 'qwerty' })

	expect(addTemplate).toHaveBeenCalledTimes(3)
	expect(vi.mocked(addTemplate).mock.calls.flat().map((options: any) => [options.filename, options.getContents()])).toMatchInlineSnapshot(`
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
})

it('proxies user files from default location', () => {
	mockFS({
		'/tmp/nuxt/app/prismic/client.ts': '',
		'/tmp/nuxt/app/prismic/linkResolver.ts': '',
		'/tmp/nuxt/app/prismic/htmlSerializer.ts': ''
	})

	mockedPrismicModule({ endpoint: 'qwerty' })

	expect(addTemplate).toHaveBeenCalledTimes(3)
	expect(vi.mocked(addTemplate).mock.calls.flat().map((options: any) => [options.filename, options.getContents()])).toMatchInlineSnapshot(`
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

	mockFS.restore()
})

it('proxies user files from provided location', () => {
	mockFS({
		'/tmp/nuxt/custom/client.ts': '',
		'/tmp/nuxt/custom/linkResolver.ts': '',
		'/tmp/nuxt/custom/htmlSerializer.ts': ''
	})

	mockedPrismicModule({
		endpoint: 'qwerty',
		client: '~/custom/client',
		linkResolver: '~/custom/linkResolver',
		htmlSerializer: '~/custom/htmlSerializer'
	})

	expect(addTemplate).toHaveBeenCalledTimes(3)
	expect(vi.mocked(addTemplate).mock.calls.flat().map((options: any) => [options.filename, options.getContents()])).toMatchInlineSnapshot(`
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

	mockFS.restore()
})

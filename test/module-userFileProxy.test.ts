import { it, expect, vi, afterEach } from 'vitest'
import { vol } from 'memfs'

import { addTemplate } from '@nuxt/kit'

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

it('proxies nothing if user files are not available', () => {
	mockedPrismicModule({ endpoint: 'qwerty' })

	expect(addTemplate).toHaveBeenCalledTimes(3)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
		    "prismic/proxy/richTextSerializer.ts",
		    "export default undefined",
		  ],
		]
	`)
})

it('proxies user files from default location', () => {
	vol.fromJSON({
		'/tmp/nuxt/app/prismic/client.ts': '',
		'/tmp/nuxt/app/prismic/linkResolver.ts': '',
		'/tmp/nuxt/app/prismic/richTextSerializer.ts': '',
	})

	mockedPrismicModule({ endpoint: 'qwerty' })

	expect(addTemplate).toHaveBeenCalledTimes(3)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
		    "prismic/proxy/richTextSerializer.ts",
		    "export { default } from '~/app/prismic/richTextSerializer'",
		  ],
		]
	`)
})

it('proxies user files from provided location', () => {
	vol.fromJSON({
		'/tmp/nuxt/custom/client.ts': '',
		'/tmp/nuxt/custom/linkResolver.ts': '',
		'/tmp/nuxt/custom/richTextSerializer.ts': '',
	})

	mockedPrismicModule({
		endpoint: 'qwerty',
		client: '~/custom/client',
		linkResolver: '~/custom/linkResolver',
		richTextSerializer: '~/custom/richTextSerializer',
	})

	expect(addTemplate).toHaveBeenCalledTimes(3)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
		    "prismic/proxy/richTextSerializer.ts",
		    "export { default } from '~/custom/richTextSerializer'",
		  ],
		]
	`)
})

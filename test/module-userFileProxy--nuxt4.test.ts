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

	return mockedNuxtKit({ nuxt4: true })
})

afterEach(() => {
	vi.clearAllMocks()
})

it('proxies nothing if user files are not available', () => {
	mockedPrismicModule({ endpoint: 'qwerty' })

	expect(addTemplate).toHaveBeenCalledTimes(6)
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
		  [
		    "prismic/proxy/linkRel.ts",
		    "export default undefined",
		  ],
		  [
		    "prismic/proxy/richTextComponents.ts",
		    "export default undefined",
		  ],
		  [
		    "prismic/proxy/sliceZoneDefaultComponent.ts",
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
		'/tmp/nuxt/app/prismic/linkRel.ts': '',
		'/tmp/nuxt/app/prismic/richTextComponents.ts': '',
		'/tmp/nuxt/app/prismic/sliceZoneDefaultComponent.vue': '',
	})

	mockedPrismicModule({ endpoint: 'qwerty' })

	expect(addTemplate).toHaveBeenCalledTimes(6)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	expect(vi.mocked(addTemplate).mock.calls.flat().map((options: any) => [options.filename, options.getContents()])).toMatchInlineSnapshot(`
		[
		  [
		    "prismic/proxy/client.ts",
		    "export { default } from '~/prismic/client'",
		  ],
		  [
		    "prismic/proxy/linkResolver.ts",
		    "export { default } from '~/prismic/linkResolver'",
		  ],
		  [
		    "prismic/proxy/richTextSerializer.ts",
		    "export { default } from '~/prismic/richTextSerializer'",
		  ],
		  [
		    "prismic/proxy/linkRel.ts",
		    "export { default } from '~/prismic/linkRel'",
		  ],
		  [
		    "prismic/proxy/richTextComponents.ts",
		    "export { default } from '~/prismic/richTextComponents'",
		  ],
		  [
		    "prismic/proxy/sliceZoneDefaultComponent.ts",
		    "export { default } from '~/prismic/sliceZoneDefaultComponent'",
		  ],
		]
	`)
})

it('proxies user files from default location (Nuxt 4)', () => {
	vol.fromJSON({
		'/tmp/nuxt/app/prismic/client.ts': '',
		'/tmp/nuxt/app/prismic/linkResolver.ts': '',
		'/tmp/nuxt/app/prismic/richTextSerializer.ts': '',
		'/tmp/nuxt/app/prismic/linkRel.ts': '',
		'/tmp/nuxt/app/prismic/richTextComponents.ts': '',
		'/tmp/nuxt/app/prismic/sliceZoneDefaultComponent.vue': '',
	})

	mockedPrismicModule({ endpoint: 'qwerty' })

	expect(addTemplate).toHaveBeenCalledTimes(6)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	expect(vi.mocked(addTemplate).mock.calls.flat().map((options: any) => [options.filename, options.getContents()])).toMatchInlineSnapshot(`
		[
		  [
		    "prismic/proxy/client.ts",
		    "export { default } from '~/prismic/client'",
		  ],
		  [
		    "prismic/proxy/linkResolver.ts",
		    "export { default } from '~/prismic/linkResolver'",
		  ],
		  [
		    "prismic/proxy/richTextSerializer.ts",
		    "export { default } from '~/prismic/richTextSerializer'",
		  ],
		  [
		    "prismic/proxy/linkRel.ts",
		    "export { default } from '~/prismic/linkRel'",
		  ],
		  [
		    "prismic/proxy/richTextComponents.ts",
		    "export { default } from '~/prismic/richTextComponents'",
		  ],
		  [
		    "prismic/proxy/sliceZoneDefaultComponent.ts",
		    "export { default } from '~/prismic/sliceZoneDefaultComponent'",
		  ],
		]
	`)
})

it('proxies user files from provided location', () => {
	vol.fromJSON({
		'/tmp/nuxt/app/custom/client.ts': '',
		'/tmp/nuxt/app/custom/linkResolver.ts': '',
		'/tmp/nuxt/app/custom/richTextSerializer.ts': '',
		'/tmp/nuxt/app/custom/linkRel.ts': '',
		'/tmp/nuxt/app/custom/richTextComponents.ts': '',
		'/tmp/nuxt/app/custom/sliceZoneDefaultComponent.vue': '',
	})

	mockedPrismicModule({
		endpoint: 'qwerty',
		client: '~/custom/client',
		linkResolver: '~/custom/linkResolver',
		richTextSerializer: '~/custom/richTextSerializer',
		components: {
			linkRel: '~/custom/linkRel',
			richTextComponents: '~/custom/richTextComponents',
			sliceZoneDefaultComponent: '~/custom/sliceZoneDefaultComponent',
		},
	})

	expect(addTemplate).toHaveBeenCalledTimes(6)
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
		  [
		    "prismic/proxy/linkRel.ts",
		    "export { default } from '~/custom/linkRel'",
		  ],
		  [
		    "prismic/proxy/richTextComponents.ts",
		    "export { default } from '~/custom/richTextComponents'",
		  ],
		  [
		    "prismic/proxy/sliceZoneDefaultComponent.ts",
		    "export { default } from '~/custom/sliceZoneDefaultComponent'",
		  ],
		]
	`)
})

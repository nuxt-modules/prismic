import { it, expect, vi, beforeEach, afterEach } from 'vitest'
import mockFS from 'mock-fs'

import { extendPages } from '@nuxt/kit'

import prismicModule from '../src/module'
import { logger } from '../src/lib'

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

it('injects default preview page', () => {
	mockedPrismicModule({ endpoint: 'qwerty' })

	expect(extendPages).toHaveBeenCalledOnce()
	// @ts-expect-error - Mocked type is wrong
	expect(extendPages.results[0][1].find(route => route.name === 'prismic-preview')).toBeDefined()
})

it('uses user preview when avaiable', () => {
	mockFS({
		'/tmp/nuxt/pages/preview.vue': ''
	})

	mockedPrismicModule({ endpoint: 'qwerty' })

	expect(extendPages).not.toHaveBeenCalledOnce()
	expect(logger.info).toHaveBeenCalledWith('Using user-defined preview page at `~/pages/preview.vue`, available at `/preview`')

	mockFS.restore()
})

it('uses user preview when avaiable at specified location', () => {
	mockFS({
		'/tmp/nuxt/pages/prismic-preview.vue': ''
	})

	mockedPrismicModule({ endpoint: 'qwerty', preview: '/prismic-preview' })

	expect(extendPages).not.toHaveBeenCalledOnce()
	expect(logger.info).toHaveBeenCalledWith('Using user-defined preview page at `~/pages/prismic-preview.vue`, available at `/prismic-preview`')

	mockFS.restore()
})

it('doesn\'t enable preview when `preview` is `false`', () => {
	mockedPrismicModule({ endpoint: 'qwerty', preview: false })

	expect(extendPages).not.toHaveBeenCalled()
	// @ts-expect-error - Mocked type is wrong
	expect(logger.info.calls.find(([info]) => info.startsWith('Using user-defined preview page at'))).toBeUndefined()
	// @ts-expect-error - Mocked type is wrong
	expect(logger.info.calls.find(([info]) => info.startsWith('Using default preview page, available at'))).toBeUndefined()
})

it('warns user that toolbar is required when `toolbar` is `false`', () => {
	mockedPrismicModule({ endpoint: 'qwerty', toolbar: false })

	expect(logger.warn).toHaveBeenCalledWith('`toolbar` option is disabled but `preview` is enabled. Previews won\'t work unless you manually load the toolbar.')
})

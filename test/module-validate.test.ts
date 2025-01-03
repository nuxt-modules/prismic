import { it, expect, vi, afterEach } from 'vitest'
import { vol } from 'memfs'

import prismicModule from '../src/module'
import { logger } from '../src/lib/logger'

import { mockModule } from './__testutils__/mockModule'

const mockedPrismicModule = mockModule(prismicModule)

vi.mock('@nuxt/kit', async () => {
	const { mockedNuxtKit } = await vi.importActual<typeof import('./__testutils__/mockedNuxtKit')>('./__testutils__/mockedNuxtKit')

	return mockedNuxtKit()
})

afterEach(() => {
	vi.clearAllMocks()
})

it('warns and returns early if endpoint is not provided, and client file is not available, and runtime config environment variables aren\'t set', () => {
	mockedPrismicModule()

	expect(logger.warn).toHaveBeenCalledOnce()
	expect(logger.warn).toHaveBeenCalledWith('`endpoint` option is missing and `~/app/prismic/client` was not found. At least one of them is required for the module to run. Disabling module...')
})

it('doesn\'t warn and return early if endpoint is provided', () => {
	mockedPrismicModule({ endpoint: 'qwerty' })

	expect(logger.warn).not.toHaveBeenCalled()
})

it('doesn\'t warn and return early if client file is provided', () => {
	vol.fromJSON({
		'/tmp/nuxt/app/prismic/client.ts': '',
	})

	mockedPrismicModule({ endpoint: 'qwerty' })

	expect(logger.warn).not.toHaveBeenCalled()
})

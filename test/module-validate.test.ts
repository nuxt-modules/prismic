import { it, expect, vi, afterEach } from 'vitest'

import prismicModule from '../src/module'
import { logger } from '../src/lib/logger'

import { mockModule } from './__testutils__/mockModule'

const mockedPrismicModule = mockModule(prismicModule)

vi.mock('consola', () => ({
	consola: { withTag: () => ({ info: vi.fn(), warn: vi.fn() }) }
}))
vi.mock('@nuxt/kit', async () => {
	const { mockedNuxtKit } = await vi.importActual<typeof import('./__testutils__/mockedNuxtKit')>('./__testutils__/mockedNuxtKit')

	return mockedNuxtKit()
})

afterEach(() => {
	vi.clearAllMocks()
})

it('warns and returns early if endpoint if not provided', () => {
	mockedPrismicModule()

	expect(logger.warn).toHaveBeenCalledOnce()
	expect(logger.warn).toHaveBeenCalledWith('Options `endpoint` is required, disabling module...')
})

import { it, expect, vi, beforeEach, afterEach } from 'vitest'

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

it('warns and returns early if endpoint if not provided', () => {
	mockedPrismicModule()

	expect(logger.warn).toHaveBeenCalledOnce()
	expect(logger.warn).toHaveBeenCalledWith('Options `endpoint` is required, disabling module...')

	vi.unmock('../src/lib/logger.ts')
})

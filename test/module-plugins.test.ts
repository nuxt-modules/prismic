import { it, expect, vi, afterEach } from 'vitest'

import { addPlugin } from '@nuxt/kit'

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

it('injects plugins', () => {
	mockedPrismicModule({ endpoint: 'qwerty' })

	expect(addPlugin).toHaveBeenCalledTimes(2)
})

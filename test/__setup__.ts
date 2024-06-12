import { afterEach, vi } from 'vitest'
import { vol } from 'memfs'

vi.mock('fs', async () => {
	const memfs: typeof import('memfs') = await vi.importActual('memfs')

	return {
		...memfs.fs,
		default: memfs.fs,
	}
})

vi.mock('fs/promises', async () => {
	const memfs: typeof import('memfs') = await vi.importActual('memfs')

	return {
		...memfs.fs.promises,
		default: memfs.fs.promises,
	}
})

afterEach(async () => {
	vi.clearAllMocks()
	vol.reset()
})

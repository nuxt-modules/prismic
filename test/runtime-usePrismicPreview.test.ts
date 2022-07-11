import { it, expect, vi, afterEach, beforeEach } from 'vitest'

import { onMounted } from 'vue'
import { usePrismicPreview } from '../src/runtime/usePrismicPreview'
// @ts-expect-error VFS
import { useRouter, usePrismic } from '#imports'

beforeEach(() => {
	vi.mock('vue', () => {
		return {
			onMounted: vi.fn(callback => callback())
		}
	})
	vi.mock('#imports', () => {
		return {
			useRouter: vi.fn(() => ({ push: vi.fn() })),
			usePrismic: vi.fn(() => ({ client: { resolvePreviewURL: vi.fn(({ defaultURL }) => defaultURL) }, options: { linkResolver: vi.fn() } }))
		}
	})
})

afterEach(() => {
	vi.restoreAllMocks()
})

it('resolves preview', async () => {
	usePrismicPreview()

	expect(useRouter).toHaveBeenCalledOnce()
	expect(usePrismic).toHaveBeenCalledOnce()
	expect(onMounted).toHaveBeenCalledOnce()

	// @ts-expect-error - Mocked type is wrong
	await onMounted.results[0][1]

	expect(usePrismic.results[0][1].client.resolvePreviewURL).toHaveBeenCalledOnce()
	expect(useRouter.results[0][1].push).toHaveBeenCalledOnce()
	expect(useRouter.results[0][1].push).toHaveBeenCalledWith('/')
})

it('resolves preview with provided `defaultURL`', async (ctx) => {
	usePrismicPreview(ctx.meta.name)

	expect(useRouter).toHaveBeenCalledOnce()
	expect(usePrismic).toHaveBeenCalledOnce()
	expect(onMounted).toHaveBeenCalledOnce()

	// @ts-expect-error - Mocked type is wrong
	await onMounted.results[0][1]

	expect(usePrismic.results[0][1].client.resolvePreviewURL).toHaveBeenCalledOnce()
	expect(useRouter.results[0][1].push).toHaveBeenCalledOnce()
	expect(useRouter.results[0][1].push).toHaveBeenCalledWith(ctx.meta.name)
})

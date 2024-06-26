import { it, expect, vi, afterEach } from 'vitest'

import { onMounted } from 'vue'
import { usePrismicPreview } from '../src/runtime/usePrismicPreview'
import { useRouter, usePrismic } from '#imports'

vi.mock('vue', () => {
	return {
		onMounted: vi.fn(callback => callback()),
	}
})
vi.mock('#imports', () => {
	return {
		useRouter: vi.fn(() => ({ push: vi.fn() })),
		usePrismic: vi.fn(() => ({ client: { resolvePreviewURL: vi.fn(({ defaultURL }) => defaultURL) }, options: { linkResolver: vi.fn() } })),
	}
})

afterEach(() => {
	vi.clearAllMocks()
})

it('resolves preview', async () => {
	usePrismicPreview()

	expect(useRouter).toHaveBeenCalledOnce()
	expect(usePrismic).toHaveBeenCalledOnce()
	expect(onMounted).toHaveBeenCalledOnce()

	await vi.mocked(onMounted).mock.results[0]?.value

	expect(vi.mocked(usePrismic).mock.results[0]?.value.client.resolvePreviewURL).toHaveBeenCalledOnce()
	expect(vi.mocked(useRouter).mock.results[0]?.value.push).toHaveBeenCalledOnce()
	expect(vi.mocked(useRouter).mock.results[0]?.value.push).toHaveBeenCalledWith('/')
})

it('resolves preview with provided `defaultURL`', async (ctx) => {
	usePrismicPreview(ctx.task.name)

	expect(useRouter).toHaveBeenCalledOnce()
	expect(usePrismic).toHaveBeenCalledOnce()
	expect(onMounted).toHaveBeenCalledOnce()

	await vi.mocked(onMounted).mock.results[0]?.value

	expect(vi.mocked(usePrismic).mock.results[0]?.value.client.resolvePreviewURL).toHaveBeenCalledOnce()
	expect(vi.mocked(useRouter).mock.results[0]?.value.push).toHaveBeenCalledOnce()
	expect(vi.mocked(useRouter).mock.results[0]?.value.push).toHaveBeenCalledWith(ctx.task.name)
})

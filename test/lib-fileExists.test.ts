import { it, expect } from 'vitest'
import { vol } from 'memfs'

import { fileExists } from '../src/lib'

it('returns null when path is missing', () => {
	expect(fileExists()).toBeNull()
})

it('returns path when path already exists', () => {
	vol.fromJSON({
		'/path/to/file': '',
		'/path/to/image': '',
	})

	expect(fileExists('/path/to/file')).toBe('/path/to/file')
	expect(fileExists('/path/to/image', ['jpg', 'jpeg', 'png', 'gif'])).toBe('/path/to/image')
})

it('returns path with extension when path and extension match', () => {
	vol.fromJSON({
		'/path/to/file.js': '',
		'/path/to/image.png': '',
	})

	expect(fileExists('/path/to/file')).toBe('/path/to/file.js')
	expect(fileExists('/path/to/image', ['jpg', 'jpeg', 'png', 'gif'])).toBe('/path/to/image.png')
})

it('returns null when path and extension don\'t match', () => {
	vol.fromJSON({})

	expect(fileExists('/path/to/file')).toBeNull()
	expect(fileExists('/path/to/image', ['jpg', 'jpeg', 'png', 'gif'])).toBeNull()
})

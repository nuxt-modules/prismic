import { it, expect } from 'vitest'
import mockFS from 'mock-fs'

import { fileExists } from '../src/lib'

it('returns null when path is missing', () => {
	expect(fileExists()).toBeNull()
})

it('returns path when path already exists', () => {
	mockFS({
		'/path/to/file': '',
		'/path/to/image': ''
	})

	expect(fileExists('/path/to/file')).toBe('/path/to/file')
	expect(fileExists('/path/to/image', ['jpg', 'jpeg', 'png', 'gif'])).toBe('/path/to/image')

	mockFS.restore()
})

it('returns path with extension when path and extension match', () => {
	mockFS({
		'/path/to/file.js': '',
		'/path/to/image.png': ''
	})

	expect(fileExists('/path/to/file')).toBe('/path/to/file.js')
	expect(fileExists('/path/to/image', ['jpg', 'jpeg', 'png', 'gif'])).toBe('/path/to/image.png')

	mockFS.restore()
})

it('returns null when path and extension don\'t match', () => {
	mockFS({})

	expect(fileExists('/path/to/file')).toBeNull()
	expect(fileExists('/path/to/image', ['jpg', 'jpeg', 'png', 'gif'])).toBeNull()

	mockFS.restore()
})

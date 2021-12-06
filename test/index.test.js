/* eslint-disable no-undef */
const fs = require('fs')
const path = require('path')
const Prismic = require('@prismicio/client')

const prismicNuxt = require('../src/module')
const logger = require('@/logger')
logger.mockTypes(() => jest.fn())

jest.mock('@prismicio/client')

Prismic.client = jest.fn(() => ({
  query () {
    const data = require('./__mockData__') // eslint-disable-line
    return data
  }
}))

describe('prismic-nuxt module', () => {
  let context
  let moduleOptions

  beforeAll(() => logger.wrapAll())
  beforeEach(() => {
    context = {
      _routes: [],
      _resolve: jest.fn(),
      addPlugin: jest.fn(),
      addTemplate: jest.fn(),
      extendRoutes: jest.fn((fn) => {
        fn(context._routes, context._resolve)
      }),
      options: {
        srcDir: '/var/nuxt',
        buildDir: '/var/nuxt/.nuxt/',
        head: {},
        dir: {},
        generate: {}
      },
      nuxt: {
        hook: jest.fn(async (_, fn) => {
          await fn()
        })
      }
    }

    moduleOptions = {
      endpoint: 'https://repoz.prismic.io/api/v2',
      apiOptions: {
        routes: [{
          type: 'page',
          path: '/pages/:uid'
        }]
      }
    }
  })

  it('should be defined', () => {
    expect(prismicNuxt).toBeDefined()
  })

  it('should add the components', () => {
    prismicNuxt.call(context, moduleOptions)
    expect(context.addPlugin.mock.calls).toHaveLength(2)
  })

  it('should not add the components if components=false', () => {
    prismicNuxt.call(context, { ...moduleOptions, components: false })
    expect(context.addPlugin.mock.calls).toHaveLength(1)
  })

  it('should set preview to /preview if true', () => {
    prismicNuxt.call(context, { ...moduleOptions, preview: true })
    expect(context.addPlugin.mock.calls.length).toEqual(2)
    expect(context.addPlugin.mock.calls[1][0].options.preview).toEqual('/preview')
  })

  it('should set preview to /test_preview', () => {
    prismicNuxt.call(context, { ...moduleOptions, preview: '/test_preview' })
    expect(context.addPlugin.mock.calls[1][0].options.preview).toEqual('/test_preview')
    expect(context._routes[0].path).toEqual('/test_preview')
    expect(context._resolve.mock.calls[0]).toEqual(['/var/nuxt/.nuxt/', 'prismic/pages/preview.vue'])
  })

  it('should remove preview if false', () => {
    prismicNuxt.call(context, { ...moduleOptions, preview: false })
    expect(context.addPlugin.mock.calls.length).toEqual(2)
  })

  it('should parse repo from endpoint', () => {
    prismicNuxt.call(context, { endpoint: 'https://test2.prismic.io/api/v2' })
    expect(context.addPlugin.mock.calls[1][0].options.repo).toEqual('test2')
  })

  it('should warn to provide endpoint', async () => {
    await prismicNuxt.call(context, {})
    expect(logger.warn).toHaveBeenNthCalledWith(1, 'Options `endpoint` is required, disabling module...')
  })

  it('should warn to create ~/app/prismic/link-resolver.js', async () => {
    await prismicNuxt.call(context, { ...moduleOptions, apiOptions: null })
    expect(logger.warn).toHaveBeenNthCalledWith(1, 'Please create ~/app/prismic/link-resolver.js')
  })

  it('should not warn to create ~/app/prismic/link-resolver.js if routes is given', async () => {
    await prismicNuxt.call(context, { ...moduleOptions })
    expect(logger.warn.mock.calls.length).toEqual(0)
  })

  it('should not warn to create ~/app/prismic/link-resolver.js if option given', async () => {
    await prismicNuxt.call(context, { ...moduleOptions, linkResolver: () => '/', apiOptions: null })
    expect(logger.warn.mock.calls.length).toEqual(0)
  })

  it('should not warn to create ~/app/prismic/link-resolver.js if path exists', async () => {
    fs.existsSync = jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(true)
    await prismicNuxt.call(context, { ...moduleOptions })
    expect(logger.warn.mock.calls.length).toEqual(0)
    expect(context.addTemplate.mock.calls[1][0].src).toEqual(path.join('/var/nuxt/app/prismic/link-resolver.js'))
  })

  it('should not create ~/app/prismic/html-serializer.js if path exists', async () => {
    fs.existsSync = jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(true).mockReturnValueOnce(true)
    await prismicNuxt.call(context, { ...moduleOptions })
    expect(logger.warn.mock.calls.length).toEqual(0)
    expect(context.addTemplate.mock.calls[2][0].src).toEqual(path.join('/var/nuxt/app/prismic/html-serializer.js'))
  })

  it('should call hook on generate:before', () => {
    prismicNuxt.call(context, moduleOptions)
    expect(context.nuxt.hook).toBeCalledWith('generate:before', expect.any(Function))
  })

  it('should return routes on generate', async () => {
    prismicNuxt.call(context, moduleOptions)
    expect(context.options.generate.routes).toEqual(expect.any(Function))
    try {
      const routes = await context.options.generate.routes()
      const expectedRoutes = ['/pages/my-page', '/pages/another-page', '/']
      expect(routes.sort()).toEqual(expectedRoutes.sort())
    } catch (e) {
      expect(e).toMatch([])
    }
  })

  it('should preserve user defined routes on generate', async () => {
    context.options.generate.routes = ['/user-route']
    prismicNuxt.call(context, moduleOptions)
    expect(context.options.generate.routes).toEqual(expect.any(Function))
    const routes = await context.options.generate.routes()
    const expectedRoutes = ['/pages/my-page', '/pages/another-page', '/', '/user-route']
    expect(routes.sort()).toEqual(expectedRoutes.sort())
  })

  it('should preserve user routes function if it is defined', async () => {
    context.options.generate.routes = () => ['/user-route']
    prismicNuxt.call(context, moduleOptions)
    expect(context.options.generate.routes).toEqual(expect.any(Function))
    const routes = await context.options.generate.routes()
    const expectedRoutes = ['/pages/my-page', '/pages/another-page', '/', '/user-route']
    expect(routes.sort()).toEqual(expectedRoutes.sort())
    expect(context.nuxt.hook).toBeCalledWith('generate:before', expect.anything())
  })

  it('should not run generate if disabled', () => {
    moduleOptions.disableGenerator = true
    prismicNuxt.call(context, moduleOptions)
    expect(context.nuxt.hook).not.toBeCalledWith('generate:before', expect.anything())
  })

  it('should not run generate if only modern is set', () => {
    moduleOptions.modern = true
    prismicNuxt.call(context, moduleOptions)
    expect(context.nuxt.hook).not.toBeCalledWith('generate:before', expect.anything())
  })

  it('should run generate if modern is set and generator is explicitely not disabled', () => {
    moduleOptions.modern = true
    moduleOptions.disableGenerator = false
    prismicNuxt.call(context, moduleOptions)
    expect(context.nuxt.hook).toBeCalledWith('generate:before', expect.anything())
  })
})

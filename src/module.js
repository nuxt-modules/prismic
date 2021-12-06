const path = require('path')
const fs = require('fs')
const logger = require('./logger')
const generate = require('./generator')

function install (moduleOptions) {
  const options = {
    preview: true,
    previewReloadType: 'hot',
    components: true,
    modern: false,
    ...moduleOptions,
    ...(this.options.prismic || {})
  }
  if (options.preview === true) {
    options.preview = '/preview'
  }
  if (options.modern === true && typeof options.disableGenerator === 'undefined') {
    options.disableGenerator = true
  }
  if (!options.endpoint) {
    logger.warn('Options `endpoint` is required, disabling module...')
    return
  }
  const repo = options.endpoint.replace(/^https?:\/\//, '').replace(/(\.cdn)?\.prismic.+/, '')
  const app = this.options.dir.app || 'app'

  // Add in Prismic libraries to enable preview
  if (options.preview) {
    // Add /preview
    const userPreviewPage = path.join(this.options.srcDir, app, 'prismic', 'pages', 'preview.vue')
    const userPreviewPageExists = fs.existsSync(userPreviewPage)

    this.addTemplate({
      fileName: 'prismic/pages/preview.vue',
      src: userPreviewPageExists ? userPreviewPage : path.join(__dirname, '../templates/pages/preview.vue')
    })
    this.extendRoutes((routes, resolve) => {
      routes.unshift({
        name: 'prismic-preview',
        path: options.preview,
        component: resolve(this.options.buildDir, 'prismic/pages/preview.vue')
      })
    })
  }

  // Add components
  if (options.components) {
    this.addPlugin({
      fileName: 'prismic/plugins/prismic-components.js',
      src: path.resolve(__dirname, '../templates/plugins/prismic-components.js')
    })
  }

  // Add templates & prismic plugin
  const userLinkResolver = path.join(this.options.srcDir, app, 'prismic', 'link-resolver.js')
  const userLinkResolverExists = fs.existsSync(userLinkResolver)
  const userHtmlSerializer = path.join(this.options.srcDir, app, 'prismic', 'html-serializer.js')

  const apiOptions = options.apiOptions || {}
  if (!userLinkResolverExists && !options.linkResolver && !apiOptions.routes) {
    logger.warn('Please create ~/app/prismic/link-resolver.js')
  }
  this.addTemplate({
    fileName: 'prismic/link-resolver.js',
    src: userLinkResolverExists ? userLinkResolver : path.join(__dirname, '../templates/link-resolver.js'),
    options
  })
  this.addTemplate({
    fileName: 'prismic/html-serializer.js',
    src: fs.existsSync(userHtmlSerializer) ? userHtmlSerializer : path.join(__dirname, '../templates/html-serializer.js'),
    options
  })
  this.addPlugin({
    fileName: 'prismic/plugins/prismic.js',
    src: path.resolve(__dirname, '../templates/plugins/prismic.js'),
    options: {
      preview: options.preview,
      previewReloadType: options.previewReloadType,
      endpoint: options.endpoint,
      modern: options.modern,
      apiOptions,
      repo,
      script: `//static.cdn.prismic.io/prismic.min.js?repo=${repo}&new=true`
    }
  })

  if (
    options.apiOptions &&
    options.apiOptions.routes &&
    !options.disableGenerator
  ) {
    generate.call(this, options)
  }
}

module.exports = install
module.exports.meta = require('../package.json')

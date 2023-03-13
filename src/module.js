const path = require('path')
const fs = require('fs')
const logger = require('./logger')
const generate = require('./generator')

async function install (moduleOptions) {
  const options = {
    preview: true,
    previewReloadType: 'hot',
    simulator: true,
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
  const pages = this.options.dir.pages || 'pages'

  // Add in Prismic libraries to enable preview
  if (options.preview) {
    // Add /preview
    const userPreviewPage = path.join(this.options.srcDir, app, 'prismic', 'pages', 'preview.vue')
    const userPreviewPageExists = fs.existsSync(userPreviewPage)

    if (userPreviewPageExists) {
      logger.info(`Using user-defined preview page, available at \`${options.preview}\``)
    } else {
      logger.info(`Using default preview page, available at \`${options.preview}\``)
    }

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

  // Add in Prismic Simulator for Slice Machine
  if (options.simulator) {
    // Skip on existing simulator (legacy)
    const slashSliceSimulator = path.join(this.options.srcDir, pages, 'slice-simulator.vue')
    if (fs.existsSync(slashSliceSimulator)) {
      logger.info('Using user-defined simulator page within the `pages` directory, available at `/slice-simulator')
    } else {
      // Detect Simulator provider (flavor)
      let flavor
      try {
        require('@slicemachine/adapter-nuxt/simulator')
        flavor = 'adapter'
      } catch {
        try {
          require('@prismicio/slice-simulator-vue')
          flavor = 'standalone'
        } catch {
          if (options.simulator !== true) {
            logger.warn('Could not injected simulator page, `@slicemachine/adapter-nuxt` is not installed')
          }
        }
      }

      // Add page if flavor was detected
      if (flavor) {
        const simulatorPath = options.simulator === true ? '/simulator' : options.simulator

        const userSimulatorPage = path.join(this.options.srcDir, app, 'prismic', 'pages', 'simulator.vue')
        const userSimulatorPageExists = fs.existsSync(userSimulatorPage)

        let registerPage = false

        // Only needed for built-in Simulator
        if (!userSimulatorPageExists) {
          try {
            const { createSliceMachineManager } = require('@slicemachine/manager')

            const manager = createSliceMachineManager({ cwd: this.options.rootDir })

            const root = await manager.project.getRoot()
            let config
            try {
              config = await manager.project.getSliceMachineConfig()
            } catch (error) {
              const configPath = await manager.project.getSliceMachineConfigPath()
              config = JSON.parse(fs.readFileSync(configPath))

              if (!Array.isArray(config.libraries)) {
                throw new TypeError(`\`${configPath}\` is missing \`libraries\` array`)
              }
            }
            const rawLibraries = config.libraries
            const libraries = []

            for (const rawLibrary of rawLibraries) {
              if (/^[@~.]\//.test(rawLibrary)) {
                const libraryAbsolutePath = path.resolve(root, rawLibrary.replace(/^[@~.]/, '.'))
                const libraryRelativePath = path.relative(this.options.rootDir, libraryAbsolutePath).replaceAll('\\', '/')
                libraries.push(`~~/${libraryRelativePath}`)
              } else {
                libraries.push(rawLibrary)
              }
            }

            this.addTemplate({
              fileName: 'prismic/all-slices.js',
              src: path.join(__dirname, '../templates/all-slices.js'),
              options: { libraries }
            })
            this.addTemplate({
              fileName: 'prismic/pages/simulator.vue',
              src: path.join(__dirname, `../templates/pages/simulator-${flavor}.vue`)
            })

            registerPage = true
            logger.info(`Using default simulator page, available at \`${simulatorPath}\``)
          } catch (error) {
            logger.warn("Could not resolve slice libraries, simulator page won't work\n\n", error)
          }
        } else {
          this.addTemplate({
            fileName: 'prismic/pages/simulator.vue',
            src: userSimulatorPage
          })

          registerPage = true
          logger.info(`Using user-defined simulator page, available at \`${simulatorPath}\``)
        }

        if (registerPage) {
          this.extendRoutes((routes, resolve) => {
            routes.unshift({
              name: 'prismic-slice-simulator',
              path: simulatorPath,
              component: resolve(this.options.buildDir, 'prismic/pages/simulator.vue')
            })
          })
        }
      }
    }
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

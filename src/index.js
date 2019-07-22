const path = require('path');

function install(moduleOptions) {
  const options = {
    preview: true,
    components: true,
    ...moduleOptions,
    ...(this.options.prismic || {})
  };

  // Add in Prismic libraries to enable preview
  if (options.preview) {
    const repo = options.endpoint.replace(/^https?:\/\//, '').replace(/(\.cdn)?\.prismic.+/, '')

    this.options.head.script = this.options.head.script || []
    this.options.head.script.push({
      src: `//static.cdn.prismic.io/prismic.min.js?repo=${repo}&new=true`,
      body: true,
      defer: true,
      async: true
    })
  }

  // Add components
  if (options.components) {
    this.addPlugin(path.resolve(__dirname, 'components/PrismicImage.js'))
    this.addPlugin(path.resolve(__dirname, 'components/PrismicLink.js'))
  }

  this.addPlugin({
    fileName: 'prismic-nuxt.js',
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      preview: options.preview,
      endpoint: options.endpoint,
      linkResolver: options.linkResolver,
      htmlSerializer: options.htmlSerializer,
    },
  })

}

module.exports = install;
module.exports.meta = require('../package.json');

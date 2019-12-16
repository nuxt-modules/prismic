const path = require('path');

function install(moduleOptions) {
  const options = {
    deferLoad: false,
    ...moduleOptions,
  };

  // Add in Prismic libraries to enable preview
  if (typeof (this.options.head.__dangerouslyDisableSanitizersByTagID) === 'undefined') {
    this.options.head.__dangerouslyDisableSanitizersByTagID = {};
  }

  if (typeof (this.options.head.script) === 'undefined') {
    this.options.head.script = [];
  }

  this.options.head.__dangerouslyDisableSanitizersByTagID['prismic-nuxt'] = ['innerHTML'];
  // this.options.head.script.push({
  //   hid: 'prismic-nuxt',
  //   innerHTML: `window.prismic = {endpoint: '${options.endpoint}'};`,
  //   type: 'text/javascript',
  // });

  this.options.head.script.push({
    src: `//static.cdn.prismic.io/prismic.min.js?new=true&repo=${moduleOptions.endpoint}`,
    ...(options.deferLoad && { defer: true }),
  });

  // Add the plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      endpoint: moduleOptions.endpoint,
      apiOptions: {
        accessToken: moduleOptions.accessToken,
        routes: moduleOptions.routes,
      },
      linkResolver: moduleOptions.linkResolver,
      htmlSerializer: options.htmlSerializer,
    },
  });
}

module.exports = install;
module.exports.meta = require('../package.json');

const path = require('path');
const Prismic = require('prismic-javascript');

function install(moduleOptions) {
  const options = {
    deferLoad: false,
    ...moduleOptions,
  };

  // Add in Prismic libraries to enable preview
  if (typeof this.options.head.__dangerouslyDisableSanitizersByTagID === 'undefined') {
    this.options.head.__dangerouslyDisableSanitizersByTagID = {};
  }

  if (typeof this.options.head.script === 'undefined') {
    this.options.head.script = [];
  }

  this.options.head.__dangerouslyDisableSanitizersByTagID['prismic-nuxt'] = ['innerHTML'];
  this.options.head.script.push({
    hid: 'prismic-nuxt',
    innerHTML: `window.prismic = {endpoint: '${options.endpoint}'};`,
    type: 'text/javascript',
  });

  this.options.head.script.push({
    src: '//static.cdn.prismic.io/prismic.min.js',
    ...(options.deferLoad && { defer: true }),
  });

  // Add the plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      endpoint: options.endpoint,
      linkResolver: options.linkResolver,
      htmlSerializer: options.htmlSerializer,
    },
  });

  if (!options.disableDefaultGenerator) {
    this.nuxt.hook('generate:before', async () => {
      const maybeF = this.options.generate.routes || [];
      this.options.generate.routes = async () => {
        const client = await Prismic.client(options.endpoint);
        async function fetchRoutes(page = 1, routes = []) {
          const response = await client.query('', { pageSize: 100, lang: '*', page });
          const allRoutes = routes.concat(response.results.map(moduleOptions.linkResolver));
          /* istanbul ignore next */
          if (response.results_size + routes.length < response.total_results_size) {
            return fetchRoutes(client, page + 1, allRoutes);
          }
          return [...new Set(allRoutes)];
        }
        const prismicRoutes = await fetchRoutes();
        const userRoutes = typeof maybeF === 'function' ? await maybeF() : maybeF;
        return [...new Set(prismicRoutes.concat(userRoutes))];
      };
    });
  }
}

module.exports = install;
module.exports.meta = require('../package.json');

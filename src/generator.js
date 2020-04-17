const Prismic = require('prismic-javascript');
const logger = require('./logger');

function generate(options) {
  this.nuxt.hook('generate:before', async () => {
    const client = Prismic.client(options.endpoint, options.apiOptions);
    const maybeF = this.options.generate.routes || [];
    const fetchRoutes = async (page = 1, routes = []) => {
      const response = await client.query('', { pageSize: 100, lang: '*', page });
      const allRoutes = routes.concat(response.results.map((e) => e.url));
      /* istanbul ignore next */
      if (response.results_size + routes.length < response.total_results_size) {
        return fetchRoutes(page + 1, allRoutes);
      }
      return [...new Set(allRoutes)];
    };
    this.options.generate.routes = async () => {
      try {
        const prismicRoutes = await fetchRoutes();
        const userRoutes = typeof maybeF === 'function' ? await maybeF(options) : maybeF;
        return [...new Set(prismicRoutes.concat(userRoutes))].filter((e) => e);
      } catch (e) /* istanbul ignore next */ {
        logger.error(e);
        return [];
      }
    };
  });
}

module.exports = generate;

const Prismic = require('prismic-javascript');
const logger = require('./logger');


function generate(options) {
  this.nuxt.hook('generate:before', async () => {
    console.log('GENERATE CALLED')
    console.log(options, options.apiOptions)
    const maybeF = this.options.generate.routes || [];
    this.options.generate.routes = async () => {
      try {
        const client = Prismic.client(options.endpoint, options.apiOptions);
        async function fetchRoutes(page = 1, routes = []) {
          const response = await client.query('', { pageSize: 100, lang: '*', page });
          const allRoutes = routes.concat(response.results.map(e => e.url));
          if (response.results_size + routes.length < response.total_results_size) {
            return fetchRoutes(page + 1, allRoutes);
          }
          return [...new Set(allRoutes)];
        }
        const prismicRoutes = await fetchRoutes();
        const userRoutes = typeof maybeF === 'function' ? await maybeF(options) : maybeF;
        return [...new Set(prismicRoutes.concat(userRoutes))].filter(e => e);
      } catch (e) {
        logger.error(e);
        return [];
      }
    };
  });
}

module.exports = generate;

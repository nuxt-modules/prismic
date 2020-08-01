import path from 'path';
import theme from '@nuxt/content-theme-docs';

export default theme({
  generate: {
    fallback: true,
    routes: ['/'],
  },
  buildModules: (buildModules) => [
    ...buildModules.map((module) => {
      if (module !== '@nuxtjs/tailwindcss') {
        return module;
      }

      return ['@nuxtjs/tailwindcss', {
        configPath: path.resolve(__dirname, 'tailwind.config.js'),
      }];
    }),
    ['@nuxtjs/google-analytics', {
      id: 'UA-27914050-11'
    }]
  ],
});

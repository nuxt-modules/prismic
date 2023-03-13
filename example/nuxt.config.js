export default {
  target: 'static',
  buildModules: ['../src/module.js'],
  prismic: {
    endpoint: 'https://200629-sms-hoy.cdn.prismic.io/api/v2',
    modern: true,
    apiOptions: {
      routes: []
    }
  }
}

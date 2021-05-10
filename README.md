# @nuxtjs/prismic

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> @nuxtjs/prismic helps you connect your [Nuxt.js](https://nuxtjs.org) application to your content hosted on [Prismic](https://prismic.io)

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [📖 &nbsp;Read the documentation](https://prismic.nuxtjs.org)

## Features

- Add Prismic to your Nuxt app in seconds
- Access Prismic SDK with `$prismic`
- Prismic previews supported, [check out the demo!](https://prismic.nuxtjs.org/#videos)
- Compact configuration

[📖 &nbsp;Read the documentation](https://prismic.nuxtjs.org)

## Setup

1. Add `@nuxtjs/prismic` dependency to your project:

```bash
yarn add @nuxtjs/prismic # or npm install @nuxtjs/prismic
```

2. Then, add `@nuxtjs/prismic` to the `buildModules` section of `nuxt.config.js` and configure your Prismic API endpoint:

```js
{
  buildModules: [
    '@nuxtjs/prismic',
  ],
  prismic: {
    endpoint: 'https://<REPOSITORY>.cdn.prismic.io/api/v2',
    modern: true
    // see documentation for more!
  }
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install`
3. Start development server using `yarn dev`

## License

[MIT License](./LICENSE)

Thanks to [James Pegg](https://github.com/jamespeggsh) for the initial implementation of the module!

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/prismic/latest.svg
[npm-version-href]: https://npmjs.com/package/@nuxtjs/prismic
[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxtjs/prismic.svg
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/prismic
[github-actions-ci-src]: https://github.com/nuxt-community/prismic-module/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/nuxt-community/prismic-module/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/prismic-module.svg
[codecov-href]: https://codecov.io/gh/nuxt-community/prismic-module
[license-src]: https://img.shields.io/npm/l/@nuxtjs/prismic.svg
[license-href]: https://npmjs.com/package/@nuxtjs/prismic

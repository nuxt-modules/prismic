# @nuxtjs/prismic [![Build Status](https://travis-ci.com/nuxt-community/prismic-module.svg?branch=master)](https://travis-ci.com/nuxt-community/prismic-module) [![Coverage Status](https://coveralls.io/repos/github/nuxt-community/prismic-module/badge.svg?branch=master)](https://coveralls.io/github/nuxt-community/prismic-module?branch=master) [![npm version](https://badge.fury.io/js/%40nuxtjs%2Fprismic.svg)](https://badge.fury.io/js/%40nuxtjs%2Fprismic)

Headless CMS meets Universal Apps - [Nuxt.js](https://nuxtjs.org) module for [Prismic](https://prismic.io).

See [live demo](https://nuxt-prismic.surge.sh) with the [demo source code](https://github.com/Atinux/nuxt-prismic-showcase).

# Installation

```
$ yarn add @nuxtjs/prismic
```

* [Getting Started](https://prismic-nuxt.js.org/docs/getting-started) - Get up and running in a few minutes.
* [Full documentation](https://prismic-nuxt.js.org/) - Full API documentation and examples.

# Features

* __Batteries Included__: Easily access official Prismic JavaScript & Prismic DOM libraries in your Nuxt.js app.
* __Preview Mode__: Automatically add Prismic Previews to your site without additional configuration.
* __Compact Configuration__: Just add your Prismic repository endpoint and a link resolver and you're good to go.
* __Prismic Components__: Accelerate your workflow with ready-to-use Prismic components

# Quick Start

Install `@nuxtjs/prismic` and add the following minimal configuration to `nuxt.config.js`;

```javascript
...
modules: [
  '@nuxtjs/prismic'
],
prismic: {
  endpoint: 'https://<REPOSITORY>.cdn.prismic.io/api/v2',
  apiOptions: { // optional
    accessToken: '<private_access_token>',
    routes: [
      {
        "type": "page",
        "path": "/:uid"
      }
    ]
  }
}
```

Then create `~/app/prismic/link-resolver.js`:

```js
export default function (doc) {
  return '/'
}
```

You can now access Prismic inside your Nuxt.js app through the `$prismic` variable. Follow our [Getting Started](https://prismic-nuxt.js.org/docs/getting-started) guide for further documentation and examples.

# Node v8 Support

Since v0.5.0, `@nuxtjs/prismic` should now work with Node v8 and above. We don't manually test on Node v8, however unit tests will now be tested on both Node v8 and V10 on Travis. There's no guarantees that it'll work as expected, especially after Node v8 drops out of support in January 2020.

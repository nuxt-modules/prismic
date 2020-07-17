# @nuxtjs/prismic

[![npm version][npm-version-src]][npm-version-href] [![Github Actions CI][github-actions-ci-src]][github-actions-ci-href] [![Codecov][codecov-src]][codecov-href] [![License][license-src]][license-href]


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
    accessToken: '<private_access_token>', // not recommended as the token will bleed in the build of Nuxt.
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

# Generate

The big innovation of Nuxt comes with its `nuxt generate` command. When building your application, its purpose is to generate the HTML for every one of your routes and store it in a file. These 'statically generated' files can then safely be served via a CDN like [Vercel](vercel.com) or [Netlify](netlify.com).

### With link resolver

To correctly generate your dynamic content, Nuxt needs to know which paths need to be rendered. The preferred way to handle this is to use the `generate.routes` property of your Nuxt config object, and adding [a function which returns a promise](https://nuxtjs.org/api/configuration-generate/#function-which-returns-a-promise). In our case, this function would fetch all Prismic documents and call your `linkResolver` for each of them:

```javascript
// nuxt.config.js
generate: {
    routes: async function() {
      const client = PrismicJs.client("https://my-endpoint.prismic.io/api/v2")
      async function fetchDocs(page = 1, routes = []) {
        const response = await client.query('', {
          pageSize: 100,
          lang: '*',
          page
        });
        const allRoutes = routes.concat(response.results);
        if (response.results_size + routes.length < response.total_results_size) {
          return fetchDocs(page + 1, allRoutes);
        }
        return [...new Set(allRoutes)];
      };
      const allRoutes = await fetchDocs()
      return allRoutes.map(linkResolver)
    }
  }
````
Although this is quite nice, it still requires you to write and maintain the resolver.

### With new routes resolver

⚠️ this feature has not been propagated on all clusters, contact us [on the forum](http://community.prismic.io/) if you want to try it out!

We're working on a new, improved link resolver called [routes resolver](https://www.slicemachine.dev/documentation/link-resolver/), which replaces the custom function with a single JSON declaration. To enable this, simply pass `apiOptions.routes` to your Prismic module:

```javascrript
modules: [["@nuxtjs/prismic", {
    endpoint: "https://your-endpoint.prismic.io/api/v2",
    apiOptions: {
      routes: [{
        type: "page",
        path: "/:uid"
      }]
    }
  }]],
````
which then adds a `url` property to each of your documents. When calling `nuxt generate`, the module fetches all documents and appends their own urls to this list of routes to be generated. Without you to write a single line of code! In a same manner, all [@prismicio/vue components](https://github.com/prismicio/prismic-vue/) use the document url, if available. If this works for you, feel free to delete your linkResolver ✌️

# Node v8 Support

Since v0.5.0, `@nuxtjs/prismic` should now work with Node v8 and above. We don't manually test on Node v8, however unit tests will now be tested on both Node v8 and V10 on Travis. There's no guarantees that it'll work as expected, especially after Node v8 drops out of support in January 2020.

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/prismic/latest.svg
[npm-version-href]: https://npmjs.com/package/@nuxtjs/prismic

[github-actions-ci-src]: https://github.com/nuxt-community/prismic-module/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/nuxt-community/prismic-module/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/prismic-module.svg
[codecov-href]: https://codecov.io/gh/nuxt-community/prismic-module

[license-src]: https://img.shields.io/npm/l/@nuxtjs/prismic.svg
[license-href]: https://npmjs.com/package/@nuxtjs/prismic

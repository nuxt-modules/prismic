---
id: configuration
title: Configuration
sidebar_label: Configuration
---

In the [getting started](getting-started.md) guide you worked with a simple configuration example.  In addition to a `linkResolver`, you can also add a `htmlSerializer` or control how the official Prismic scripts are loaded.

## `endpoint` (Required)

This is the endpoint of your Prismic repository. Currently only public repositories are supported (support for private / secured may be added in future).

## `linkResolver` (Required)

This is the function used by `PrismicDOM` to generate links for your documents. You can read more about Link Resolving in the official [Prismic documentation](https://prismic.io/docs/javascript/beyond-the-api/link-resolving).

## `htmlSerializer`

You can pass through a `htmlSerializer` function if you want to change how `prismic-dom` generates HTML. You can read more about the HTML Serializer in the official [Prismic documentation](https://prismic.io/docs/javascript/beyond-the-api/html-serializer).

## `preview`

By default, the [preview](/docs/preview) mode is activated, you can disable it by setting `preview` to `false`.

## `components`

By default, the [prismic components](/docs/components) are imported, to disable it, set `components` to `false`.

## Kitchen Sink

`nuxt.config.js`:
```javascript
export default {
  // ...
  modules: [
    'prismic-nuxt'
  ],
  prismic: {
    endpoint: 'https://<REPOSITORY>.cdn.prismic.io/api/v2',
    preview: true, // default value
    components: true, // default value
    linkResolver (doc) {
      return '/'
    },
    htmlSerializer (type, element, content, children) {

    }
  }
}
```

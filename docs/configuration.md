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

## `deferLoad`
By default, the Prismic preview scripts are loaded as soon as possible. This can make the page load a little slower, but it isn't typically noticeable. You can defer the loading of the preview scripts by setting `deferLoad` to `true`. Defered script loading works on [most modern browsers](https://caniuse.com/#feat=script-defer).

## Kitchen Sink
```javascript
...
modules: [
  ['prismic-nuxt', {
    endpoint: 'https://<REPOSITORY>.cdn.prismic.io/api/v2',
    deferLoad: true,
    linkResolver: function(doc, ctx) {
      return '/'
    },
    htmlSerializer: function(type, element, content, children) {

    }
  }]
]

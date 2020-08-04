---
title: $prismic object
description: 'Easily connect your Nuxt.js application to your content hosted on Prismic'
position: 320
category: 'Module API Reference'
version: 1.2
fullscreen: false
---

This module globally injects a `$prismic` object, meaning that you can access it anywhere using `this.$prismic`. For plugins, `asyncData`, `fetch`, `nuxtServerInit` and middlewares, you can access it from `context.$prismic`.

## Methods

### `linkResolver(doc)`

This is the `linkResolver` function you provided at `~/app/prismic/link-resolver.js`.

<alert type="info">

More on link resolving on [Prismic documentation](https://prismic.io/docs/vuejs/beyond-the-api/link-resolving).

</alert>

### `htmlSerializer(type, element, content, children)`

This is the `htmlSerializer` function you provided at `~/app/prismic/html-serializer.js`.

<alert type="info">

More on the HTML Serializer on [Prismic documentation](https://prismic.io/docs/vuejs/beyond-the-api/html-serializer).

</alert>

### `asHtml(richText)`

Similar to `PrismicDOM.RichText.asHtml`, except that you don't have to pass through `linkResolver` and `htmlResolver` functions, the ones you provided are injected.

- `richText`
  - Type: `Object` (Prismic Rich Text field object)
  - `required`

### `asText(richText)`

Similar to `PrismicDOM.RichText.asText`.

- `richText`
  - Type: `Object` (Prismic Rich Text field object)
  - `required`

### `asLink(link)`

Similar to `PrismicDOM.Link.url`, except that you don't have to pass through a `linkResolver` function, the one you provided is injected.

- `link`
  - Type: `Object` (Prismic Link field object)
  - `required`

### `asDate(date)`

Similar to `PrismicDOM.Date`.

- `date`
  - Type: `String` (Prismic Date field string)
  - `required`

### `preview()`

This method resolves a preview session. You might be interested to use it if you provide a [custom preview page](/previews#customizing-the-preview-page).

<alert>

This method is only available when previews are enabled.

</alert>

## Properties

### `api`

Contains current instance of the Prismic API, see the [fetching content](/fetching-content) example or learn more on how to query the API on [Prismic documentation](https://prismic.io/docs/vuejs/query-the-api/how-to-query-the-api).

### `predicates`

Contains all Prismic predicates coming from [`prismic-javascript`](https://github.com/prismicio/prismic-javascript) kit, see complete predicate reference on [Prismic documentation](https://prismic.io/docs/vuejs/query-the-api/query-predicate-reference).

### `dom`

Gives your direct access to the [`prismic-dom`](https://github.com/prismicio/prismic-dom) library.

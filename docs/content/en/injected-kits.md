---
title: Injected kits
description: 'Easily connect your Nuxt.js application to your content hosted on Prismic'
position: 130
category: 'Getting Started'
version: 1.2
fullscreen: false
---

The advantage of using this module is that it injects and configures for you Prismic kits.

Methods and variables exposed by those kits are available through a `$prismic` object which is both injected inside your Vue.js application (`this.$prismic`) and [Nuxt.js context](https://nuxtjs.org/guides/concepts/context-helpers) object making them available pretty much anywhere inside your application (Vue.js components, Nuxt.js `asyncData` hook, Vuex store, etc.)

## [`prismic-javascript`](https://github.com/prismicio/prismic-javascript)

This kit provides functions necesary to query Prismic API. It mainly grants access to the Prismic API object and its predicates.

You can check our example on [fetching a document](/fetching-content) or learn more on how to query the API on [Prismic documentation](https://prismic.io/docs/vuejs/query-the-api/how-to-query-the-api).

## [`prismic-dom`](https://github.com/prismicio/prismic-dom)

This kit provides a set of helpers to handle Prismic data. They are injected inside your Nuxt.js application through the `$prismic` object:

<code-group>
  <code-block label="asHtml" active>

```javascript
$prismic.asHtml(richText) // link resolver is provided
```

  </code-block>
  <code-block label="asText">

```javascript
$prismic.asText(richText)
```

  </code-block>
  <code-block label="asLink">

```javascript
$prismic.asLink(link) // link resolver is provided
```

  </code-block>
  <code-block label="asDate">

```javascript
$prismic.asDate(date)
```

  </code-block>
</code-group>

## [`@prismicio/vue`](https://github.com/prismicio/prismic-vue)

This kit provides a set of components to easily display Prismic data. They are injected inside your Vue.js application as global components therefore making them accessible from anywhere. Here's their basic usage:

<code-group>
  <code-block label="prismic-rich-text" active>

```html
<prismic-rich-text :field="doc.text" />
<!-- link resolver is provided -->
```

  </code-block>
  <code-block label="prismic-link">

```html
<prismic-link :field="doc.link">My link</prismic-link>
<!-- link resolver is provided -->
```

  </code-block>
  <code-block label="prismic-image">

```html
<prismic-image :field="doc.image" />
```

  </code-block>
  <code-block label="prismic-embed">

```html
<prismic-embed :field="doc.embed" />
```

  </code-block>
</code-group>

<alert type="info">

More on templating Prismic data on [Prismic documentation](https://prismic.io/docs/vuejs/templating/response-object).

</alert>

---
title: Injected kits
description: 'Easily connect your Nuxt.js application to your content hosted on Prismic'
position: 130
category: 'Getting Started'
version: 1.2
fullscreen: false
---

The main advantage of using this module is that it injects and configures for you Prismic kits, easing your development workflow with those.

Methods and properties exposed by those kits are made available through a [`$prismic` object](/prismic-object) which is injected globally, meaning that you can access it anywhere using `this.$prismic`. For plugins, `asyncData`, `nuxtServerInit` and middlewares, you can access it from `context.$prismic`.

## [prismic-javascript](https://github.com/prismicio/prismic-javascript)

This kit provides functions necessary to query Prismic API. It mainly grants access to the Prismic API object and its predicates:

<code-group>
  <code-block label="api" active>

```javascript
$prismic.api.query(/* ... */) // API query example
```

  </code-block>
  <code-block label="predicates">

```javascript
$prismic.predicates.at(/* ... */) // `at` predicate example
```

  </code-block>
</code-group>

You can check our example on [fetching a document](/fetching-content#from-a-page) or learn more on how to query the API on [Prismic documentation](https://prismic.io/docs/technologies/query-content-from-cms-nuxtjs).

## [prismic-dom](https://github.com/prismicio/prismic-dom)

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

## [@prismicio/vue](https://github.com/prismicio/prismic-vue)

This kit provides a set of components to easily display Prismic data. They are injected inside your Vue.js application as global components therefore making them accessible from anywhere, here's their basic usage:

<code-group>
  <code-block label="prismic-rich-text" active>

```html
<!-- link resolver is provided -->
<prismic-rich-text :field="doc.text" />
```

  </code-block>
  <code-block label="prismic-link">

```html
<!-- link resolver is provided -->
<prismic-link :field="doc.link">My link</prismic-link>
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

More on templating Prismic data on [Prismic documentation](https://prismic.io/docs/technologies/the-response-object-vuejs).

</alert>

<alert type="info">

You can disable injection of those components through [module's configuration](/configuration#components).

</alert>

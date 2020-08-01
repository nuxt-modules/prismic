---
title: Components
description: '`@nuxtjs/prismic` ships with built-in components to get you started quickly.'
position: 220
category: Built-in Features
version: 1.0.0
fullscreen: false
---

`@nuxtjs/prismic` ships with built-in components to get you started quickly. These components are imported from [prismic-vue/components](https://github.com/prismicio/prismic-vue#list-of-components).

## &lt;prismic-rich-text&gt;

This component will, depending on your prismic html serializer, render your rich text as html:

Props:

- `field`:
  - type: `Object`
  - required: `true`
- `wrapper`:
  - type: `String`
  - default: `'div'`
- `html-serializer`:
  - type: `Function`
  - default: `$prismic.htmlSerializer` (defined in `app/prismic/html-serializer.js`)

```html
<prismic-rich-text :field="item.description" />
```

## &lt;prismic-link&gt;

This component will, depending on your prismic link, use `<nuxt-link>` or `<a>`.

Props:

- `field`:
  - type: `Object`

```html
<prismic-link :field="item.link_to_product">My link</prismic-link>
```

## &lt;prismic-image&gt;

This component will render an `<img>`, also completing `alt` and `copyright` attributes if provided by the Prismic API.

Props:

- `field`:
  - type: `Object`

```html
<prismic-image :field="item.product_image" />
```

## &lt;prismic-embed&gt;

This component will render a `<div>`, also completing `alt` and `copyright` attributes if provided by the Prismic API.

Props:

- `field`:
  - type: `Object`
  - required: `true`
- `wrapper`:
  - type: `String`
  - default: `'div'`

```html
<prismic-embed :field="item.embed" />
```

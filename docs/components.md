---
id: components
title: Components
sidebar_label: Components
---

`prismic-nuxt` ships with built-in components to get you started quickly.

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

---
title: Helper Functions
description: 'Out of the box, `@nuxtjs/prismic` comes with a few helper functions that sit on top of `prismic-dom`.'
position: 130
category: Getting Started
version: 1.0.0
fullscreen: false
---

Out of the box, `@nuxtjs/prismic` comes with a few helper functions that sit on top of `prismic-dom`;

## `asHtml`

```javascript
$prismic.asHtml(richText)
```

This is the same as `PrismicDOM.asHtml`, except you don't have to pass through the `linkResolver` or `htmlSerializer`.

## `asText`

```javascript
$prismic.asText(richText)
```

This is the same as `PrismicDOM.RichText.asText`.

## `asLink`

```javascript
$prismic.asLink(link)
```

This is the same as `PrismicDOM.Link.url`, except you don't have to pass through the `linkResolver`.

## `asDate`

```javascript
$prismic.asDate(date)
```

This is the same as `PrismicDOM.Date`.

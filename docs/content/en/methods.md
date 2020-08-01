---
title: Methods
description: 'Methods provided by Prismic helpers.'
position: 310
category: API
version: 1.2
fullscreen: false
---

## `linkResolver`

```javascript
$prismic.linkResolver(doc)
```

This is the `linkResolver` function that you defined in `app/prismic/link-resolver.js`.

## `htmlSerializer`

```javascript
$prismic.htmlSerializer(type, element, content, children)
```

This is the `htmlSerializer` function that you defined in `app/prismic/html-serializer.js`.

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

## `preview`

_Only available with `preview !== false`._

```javascript
$prismic.preview()
```

This method is used internally in the `mounted` hook of the preview page.

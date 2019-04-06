---
id: methods
title: Methods
sidebar_label: Methods
---

## `linkResolver`
```javascript
$prismic.linkResolver(doc)
```
This is the `linkResolver` function that you defined in `nuxt.config.js`.

## `htmlSerializer`
```javascript
$prismic.htmlSerializer(type, element, content, children)
```
This is the `htmlSerializer` function that you defined in `nuxt.config.js`.

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

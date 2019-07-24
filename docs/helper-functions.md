---
id: helper-functions
title: Helper Functions
sidebar_label: Helper Functions
---

Out of the box, `prismic-nuxt` comes with a few helper functions that sit on top of `prismic-dom`;

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

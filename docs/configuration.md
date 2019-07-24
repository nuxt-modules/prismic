---
id: configuration
title: Configuration
sidebar_label: Configuration
---

In the [getting started](getting-started.md) guide you worked with a simple configuration example.

## nuxt.config.js

The following keys are under the `prismic` key in `nuxt.config.js`.

### `endpoint` (Required)

- Type: `String`

This is the endpoint of your Prismic repository. Currently only public repositories are supported (support for private / secured may be added in future).

### `preview`

- Type: `Boolean | String`
- Default: `true`

Activate the [preview mode](/docs/preview), default path is `/preview`.

To define a custom path for it, use a string, ex: `preview: '/my-preview'`.

### `components`

- Type: `Boolean`
- Default: `true`

By default, the [prismic components](/docs/components) are imported, to disable it, set `components` to `false`.

## Kitchen Sink

`nuxt.config.js`:
```javascript
export default {
  modules: [
    'prismic-nuxt'
  ],
  prismic: {
    endpoint: 'https://<REPOSITORY>.cdn.prismic.io/api/v2',
    preview: true, // default value
    components: true // default value
  }
}
```

## Application configuration

## `app/prismic/link-resolver.js` (Required)

This is the function used by `PrismicDOM` to generate links for your documents. You can read more about Link Resolving in the official [Prismic documentation](https://prismic.io/docs/javascript/beyond-the-api/link-resolving).

Example:

```js
export default function (doc) {
  if (doc.type === 'products') {
    return '/products'
  }

  return '/'
}
```

## `app/prismic/html-serializer.js`

You can pass through a `htmlSerializer` function if you want to change how `prismic-dom` generates HTML. You can read more about the HTML Serializer in the official [Prismic documentation](https://prismic.io/docs/javascript/beyond-the-api/html-serializer).

Example:

```js
var PrismicDOM = require('prismic-dom');
var Elements = PrismicDOM.RichText.Elements;
 
export default function (type, element, content, children) {
  switch(type) {
 
    // Add a class to paragraph elements
    case Elements.paragraph:
      return '<p class="paragraph-class">' + children.join('') + '</p>';
 
    // Don't wrap images in a <p> tag
    case Elements.image:
      return '<img src="' + element.url + '" alt="' + element.alt + '">';
 
    // Add a class to hyperlinks
    case Elements.hyperlink:
      var target = element.data.target ? 'target="' + element.data.target + '" rel="noopener"' : '';
      var linkUrl = PrismicDOM.Link.url(element.data, linkResolver);
      return '<a class="some-link"' + target + ' href="' + linkUrl + '">' + content + '</a>';
 
    // Return null to stick with the default behavior for all other elements
    default:
      return null;
  }
};
``` 

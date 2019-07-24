---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

Get started by adding `prismic-nuxt` to an existing Nuxt.js project;

```bash
$ yarn add prismic-nuxt
```

Now open up your `nuxt-config.js` and add the following minimal configuration inside the `modules` section;

```javascript
modules: [
  'prismic-nuxt'
],
prismic: {
  endpoint: 'https://<REPOSITORY>.cdn.prismic.io/api/v2'
}
```

Secondly, Prismic requires a [link resolver function](https://prismic.io/docs/javascript/beyond-the-api/link-resolving) to know how to generate the link, let's create `app/prismic/link-resolver.js` file:

```js
export default function (doc) {
  return '/'
}
```

This will be enough to get `prismic-nuxt` up and running, but it's worth checking out the full [configuration documentation](configuration.md) to see what other features you can configure.

From here you can use Prismic inside your Nuxt.js app through the `$prismic` variable. Some common tasks include;

## Fetching a document

Typically you would fetch documents from Prismic inside the `asyncData` function;
```vue
<template>
  <section>
    <div v-html="$prismic.asHtml(document.data.title)"></div>
  </section>
</template>

<script>
export default {
  async asyncData({ $prismic, error }) {
    let document = await $prismic.api.getByUID('page', 'my-page')

    if (document) {
      return { document }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>
```

## Setting page metadata

More often than not, you'll want to set some metadata, like the page title and description. You can do this directly inside the `head()` function of your pages, but you have to access `prismic-nuxt` slightly differently;

```javascript
...
head() {
  return {
    title: this.$prismic.asText(document.data.meta_title),
    link: [
      { rel: 'canonical', href: `https://<DOMAIN>${this.$prismic.linkResolver(this.document)}` }
    ],
    meta: [
      { hid: 'description', name: 'description', content: this.$prismic.asText(this.document.data.meta_description) }
    ]
  }
}
```

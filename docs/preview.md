---
id: preview
title: Preview
sidebar_label: Preview
---

One of the most powerful features of Prismic is the ability to preview content before it goes live. Setting up the preview functionality can be a little tricky, which is `prismic-nuxt` does it out of the box.

You don't have to change any configuration for the preview mode to be available. `prismic-nuxt` automatically adds the Prismic preview scripts at the end of the `<body>` of the page. It also registers a new `/preview` route in the Nuxt.js app which deals with session cookies and redirects.

You can configure the preview route by giving a path to the `preview` key:

`nuxt.config.js`:
```js
prismic: {
  endpoint: '...',
  preview: '/_my-preview'
}
```

## Customizing the preview page

By default, `prismic-nuxt` will create a preview page in `.nuxt/prismic/pages/preview.vue`, you can overwrite if by creating it in `app/prismic/pages/preview.vue`:

```vue
<template>
  <p>Loading Prismic preview...</p>
</template>

<script>
export default {
  mounted() {
    this.$prismic.preview()
  }
}
</script>
```

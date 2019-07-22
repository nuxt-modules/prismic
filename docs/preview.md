---
id: preview
title: Preview
sidebar_label: Preview
---

One of the most powerful features of Prismic is the ability to preview content before it goes live. Setting up the preview functionality can be a little tricky, which is `prismic-nuxt` does it out of the box.

You don't have to change any configuration for the preview mode to be available. `prismic-nuxt` automatically adds the Prismic preview scripts in the `HEAD` of the page. It also registers a new `/preview` route in the Nuxt.js app which deals with session cookies and redirects.

## Using previews on a statically generated website

If you're statically generating your website (using `nuxt generate`), you have to slightly tweak how you fetch content. Nuxt.js won't automatically run the `asyncData` function again to get fresh data. The easiest thing is to the use the `created` lifecycle hook to force the page to get the most up to date content from Prismic;

```vue
<script>
function getPage(prismic) {
  return prismic.api.getByUID('page', 'my-page')
}

export default {
  async asyncData({ app, error }) {
    let document = await getPage(app.$prismic)

    if (document) {
      return { document }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  created() {
    getPage(this.$prismic).then(document => {
      this.document = document
    })
  }
}
</script>
```

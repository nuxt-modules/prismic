# prismic-nuxt
Easily add Prismic to your next Nuxt project with `prismic-nuxt`

# Installation
`$ npm install prismic-nuxt`

# Features
* Easily access the Prismic Javascript library via `$prismic`
* Easily access the Prismic DOM library via `$prismic.dom`
* Support for Prismic previews built in

# Usage
To get started, you need to add `prismic-nuxt` to your `nuxt.config.js` file;

```javascript
modules: [
  ['prismic-nuxt', {
    endpoint: 'https://<REPOSITORY>.cdn.prismic.io/api/v2',
    linkResolver: function(doc, ctx) {
      return '/'
    }
  }]
]
```

You need to pass in your endpoint URL and a `linkResolver` function.

Now you can access Prismic in any part of your Nuxt app;

```vue
<template>
  <section>
    <div v-html="$prismic.dom.RichText.asHtml(document.data.title, $prismic.linkResolver)"></div>
  </section>
</template>

<script>
export default {
  async asyncData({ app, error }) {
    let document = await app.$prismic.api.getByUID('page', 'my-page')

    if (document) {
      return { document }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 50px 0;
}
</style>

```

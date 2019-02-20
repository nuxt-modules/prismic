# prismic-nuxt [![Build Status](https://travis-ci.com/jamespegg/prismic-nuxt.svg?branch=master)](https://travis-ci.com/jamespegg/prismic-nuxt) [![Coverage Status](https://coveralls.io/repos/github/jamespegg/prismic-nuxt/badge.svg?branch=master)](https://coveralls.io/github/jamespegg/prismic-nuxt?branch=master) [![npm version](https://badge.fury.io/js/prismic-nuxt.svg)](https://badge.fury.io/js/prismic-nuxt)
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
    deferLoad: true, //Optionally defer loading the prismic preview script
    linkResolver: function(doc, ctx) {
      return '/'
    },
    htmlSerializer: function(type, element, content, children) {
      // Optional HTML Serializer
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

# Using previews on statically generated content
If you're statically generating your website, you have to slightly tweak how you fetch content. Nuxt won't run the `asyncData` function again to get fresh data. The easiest thing is to the use the `created` lifecycle hook to force the page to get the most up to date content from Prismic;

```vue
...
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
...
```

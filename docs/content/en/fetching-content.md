---
title: Fetching content
description: 'Easily connect your Nuxt.js application to your content hosted on Prismic'
position: 210
category: 'Examples'
version: 1.2
fullscreen: false
---

This page is meant to show you some content fetching strategies with this module, please refer to [Prismic documentation](https://prismic.io/docs/vuejs/query-the-api/how-to-query-the-api) to learn more on querying the API.

## From a page

### With [Quick Query Helpers](https://prismic.io/docs/vuejs/query-the-api/quick-query-helpers)

```javascript[_uid.vue]
export default {
  async asyncData({ $prismic, params, error }) {
    const document = await $prismic.api.getByUID('page', params.uid)

    if (document) {
      return { document }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
```

### With [Predicates](https://prismic.io/docs/vuejs/query-the-api/query-predicate-reference)

```javascript[_uid.vue]
export default {
  async asyncData({ $prismic, params, error }) {
    const document = await $prismic.api.query(
      this.$prismic.predicates.at('my.page.uid', params.uid)
    )

    if (document) {
      return { document }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
```

## From a component

```javascript[AppHeader.vue]
export default {
  async fetch() {
    this.headerData = await $prismic.api.getSingle('header')
  }
}
```

## From Vuex store

```javascript[index.js]
export const actions = {
  async load({ commit }) {
    const settings = await this.$prismic.api.getSingle('site_settings')
    commit('setSettings', settings)
  }
}
```

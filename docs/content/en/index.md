---
title: "Documentation"
description: "Easily connect your Nuxt 3 application to your content hosted on Prismic"
category: "Home"
version: 1.2
badge: ""
draft: false
features:
  - Add Prismic to your Nuxt app in seconds
  - Access Prismic SDK through composition and options API
  - Prismic previews supported
---

<style>
.prose h2 {
	margin-top: 6rem;
}
.prose h3 {
	margin-top: 1rem;
}

.nuxt-content-highlight {
	margin-top: 1rem;
	margin-bottom: 1rem;
}
</style>

<d-alert type="info">

This is the documentation for [`@nuxtjs/prismic` version 3](https://github.com/nuxt-community/prismic-module), the [Prismic](https://prismic.io?utm_campaign=devexp&utm_source=nuxt3doc&utm_medium=homepage) module for [Nuxt 3](https://v3.nuxtjs.org).

If you're using [Nuxt 2](https://nuxtjs.org) or [Nuxt Bridge](https://v3.nuxtjs.org/getting-started/bridge), check out the documentation for the previous version of the `@nuxtjs/prismic` at [prismic.nuxtjs.org](https://prismic.nuxtjs.org).

</d-alert>

<d-list :items="features"></d-list>

## Module Status

Similar to Nuxt 3, this module is currently under heavy development. We try to implement new features and port existing ones to Nuxt 3 following the new framework progress and growing feature set.

### How to help?

This module is for now considered, like Nuxt 3, as _unstable_, however feel free to play with it and [share your feedback](https://github.com/nuxt-community/prismic-module/issues/new/choose) with us!

## Installation

Add `@nuxtjs/prismic@alpha` dependency to your project:

<d-code-group class="my-4">
  <d-code-block label="Yarn" active>

```bash
yarn add --dev @nuxtjs/prismic@alpha
```

  </d-code-block>
  <d-code-block label="NPM">

```bash
npm install --save-dev @nuxtjs/prismic@alpha
```

  </d-code-block>
</d-code-group>

Then, add `@nuxtjs/prismic` to the `modules` section of your Nuxt config and configure your Prismic API endpoint:

```javascript[nuxt.config.[jt]s]
import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
	modules: ['@nuxtjs/prismic'],
	prismic: {
		endpoint: 'my-repository'
	},
});
```

For more configuration options, refer to the [configuration reference](#configuration-reference) section.

## Examples

Here are few Nuxt-specific examples, for how to use the module refer to the comprehensive [`@prismicio/vue` documentation](https://prismic.io/docs/technical-reference/prismicio-vue?version=v3&utm_campaign=devexp&utm_source=nuxt3doc&utm_medium=doc)

### Fetching content

An [`@prismicio/client`](https://prismic.io/docs/technical-reference/prismicio-client?utm_campaign=devexp&utm_source=nuxt3doc&utm_medium=doc) instance is available through the globally available `usePrismic()` composable. You can use it to fetch content from your Prismic repository inside Nuxt composables:

```vue[app.vue]
<script setup>
const { client } = usePrismic()
const { data: home } = await useAsyncData('home', () => client.getByUID('page', 'home'))
</script>
```

### Templating content

The module injects multiple components to template Prismic data which are made available globally in your application:

<d-code-group class="my-4">
  <d-code-block label="prismic-rich-text" active>

```html
<prismic-rich-text :field="doc.text" />
```

  </d-code-block>
  <d-code-block label="prismic-text">

```html
<prismic-text :field="doc.text" />
```

  </d-code-block>
  <d-code-block label="prismic-link">

```html
<prismic-link :field="doc.link">My link</prismic-link>
```

  </d-code-block>
  <d-code-block label="prismic-image">

```html
<prismic-image :field="doc.image" />
```

  </d-code-block>
  <d-code-block label="prismic-embed">

```html
<prismic-embed :field="doc.embed" />
```

  </d-code-block>
  <d-code-block label="slice-zone">

```html
<slice-zone :slices="doc.body" :components="components" />
```

  </d-code-block>
</d-code-group>

Learn more about injected components in the [`@prismicio/vue` documentation](https://prismic.io/docs/technical-reference/prismicio-vue?version=v3&utm_campaign=devexp&utm_source=nuxt3doc&utm_medium=doc#components-usage)

### Custom preview page

You can override the default preview page by creating a page at the route configured for the preview (default: `/preview`):

```vue[~/pages/preview.vue]
<template>
	<p>Loading Prismic preview...</p>
</template>

<script setup>
// The following code is quite boilerplate for now, a simpler composable will be provided in the future
import { onMounted } from 'vue'

const { client, options: { linkResolver } } = usePrismic()
const { push } = useRouter()
onMounted(async () => {
	const redirectURL = await client.resolvePreviewURL({
		linkResolver,
		defaultURL: '/'
	})

	push(redirectURL ?? '/')
})
</script>
```

## Configuration Reference

You can configure `@nuxtjs/prismic` with the `prismic` property in your Nuxt config.

```javascript[nuxt.config.[jt]s]
import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
	prismic: {
		/* configuration */
	},
});
```

#### `...PrismicPluginOptions`

Refer to [`@prismicio/vue` documentation](https://prismic.io/docs/technical-reference/prismicio-vue?version=v3&utm_campaign=devexp&utm_source=nuxt3doc&utm_medium=doc#plugin-usage) for available options.

#### `preview`

- Type: `string | false`
- Default: `/preview`

The route to use for the preview page, disable previews with `false`.

```javascript[nuxt.config.[jt]s]
prismic: {
  preview: false // disable previews
}
```

### Interface

```typescript
type PrismicModuleOptions = PrismicPluginOptions & {
	preview?: string | false
}
```

### Defaults

```
{
	injectComponents: true,
	preview: '/preview'
}
```

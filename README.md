<!--

Replace all on all files (README.md, CONTRIBUTING.md, bug_report.md, package.json):
- @nuxtjs/prismic
- Easily connect your Nuxt application to your content hosted on Prismic
- nuxt-modules/prismic
- prismic

-->

# @nuxtjs/prismic

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

Easily connect your [Nuxt][nuxt] application to your content hosted on [Prismic][prismic].

- 🚀 &nbsp;Add Prismic to your Nuxt app in seconds.
- 🍡 &nbsp;Fetch and present Prismic content with components and composables.
- 🏀 &nbsp;[Try it now on the online playground][playground].

## Install

Install the module to your Nuxt application with one command:

```bash
npx nuxi@latest module add prismic
```

Then, configure your Prismic API endpoint:

```javascript
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
	modules: ['@nuxtjs/prismic'],
	prismic: {
		endpoint: 'my-repository'
	},
});
```

That's it! You can now use Prismic in your Nuxt app ✨

## Documentation

To discover what's new on this package check out [the changelog][changelog]. For full documentation, visit the [official Prismic documentation][prismic-docs].

## Contributing

Whether you're helping us fix bugs, improve the docs, or spread the word, we'd love to have you as part of the Prismic developer community!

**Asking a question**: [Open a new topic][forum-question] on our community forum explaining what you want to achieve / your question. Our support team will get back to you shortly.

**Reporting a bug**: [Open an issue][repo-bug-report] explaining your application's setup and the bug you're encountering.

**Suggesting an improvement**: [Open an issue][repo-feature-request] explaining your improvement or feature so we can discuss and learn more.

**Submitting code changes**: For small fixes, feel free to [open a pull request][repo-pull-requests] with a description of your changes. For large changes, please first [open an issue][repo-feature-request] so we can discuss if and how the changes should be implemented.

For more clarity on this project and its structure you can also check out the detailed [CONTRIBUTING.md][contributing] document.

## License

[MIT License](./LICENSE)

<!-- Links -->

[prismic]: https://prismic.io

<!-- Replace link with a more useful one if available -->

[prismic-docs]: https://prismic.io/docs/nuxt
[nuxt-docs]: https://nuxt.com
[changelog]: ./CHANGELOG.md
[contributing]: ./CONTRIBUTING.md
[playground]: https://stackblitz.com/github/nuxt-modules/prismic/tree/master/examples/minimal?file=pages%2Findex.vue

<!-- Replace link with a more useful one if available -->

[forum-question]: https://community.prismic.io
[repo-bug-report]: https://github.com/nuxt-modules/prismic/issues/new?assignees=&labels=bug&template=bug_report.md&title=
[repo-feature-request]: https://github.com/nuxt-modules/prismic/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=
[repo-pull-requests]: https://github.com/nuxt-modules/prismic/pulls

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/prismic/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@nuxtjs/prismic
[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxtjs/prismic.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/prismic

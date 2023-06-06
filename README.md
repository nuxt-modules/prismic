<!--

Replace all on all files (README.md, CONTRIBUTING.md, bug_report.md, package.json):
- @nuxtjs/prismic
- Easily connect your Nuxt 3 application to your content hosted on Prismic
- nuxt-modules/prismic
- prismic

-->

# @nuxtjs/prismic

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![Conventional Commits][conventional-commits-src]][conventional-commits-href]
[![License][license-src]][license-href]

Easily connect your Nuxt.js application to your content hosted on [Prismic][prismic].

- 🚀 &nbsp;Add Prismic to your Nuxt app in seconds;
- 🎣 &nbsp;Access Prismic SDK through composition and options API;
- 🖼 &nbsp;Prismic previews supported.

## Install

```bash
npm install --save-dev @nuxtjs/prismic@rc # or yarn add --dev @nuxtjs/prismic@rc
```

Then, add `@nuxtjs/prismic` to the `modules` section of your Nuxt config and configure your Prismic API endpoint:

```javascript
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
	modules: ['@nuxtjs/prismic'],
	prismic: {
		endpoint: 'my-repository'
	},
});
```

## Documentation

To discover what's new on this package check out [the changelog][changelog]. For full documentation, visit the [module documentation][nuxt-docs] and [Prismic official documentation][prismic-docs].

## Contributing

Whether you're helping us fix bugs, improve the docs, or spread the word, we'd love to have you as part of the Prismic developer community!

**Asking a question**: [Open a new topic][forum-question] on our community forum explaining what you want to achieve / your question. Our support team will get back to you shortly.

**Reporting a bug**: [Open an issue][repo-bug-report] explaining your application's setup and the bug you're encountering.

**Suggesting an improvement**: [Open an issue][repo-feature-request] explaining your improvement or feature so we can discuss and learn more.

**Submitting code changes**: For small fixes, feel free to [open a pull request][repo-pull-requests] with a description of your changes. For large changes, please first [open an issue][repo-feature-request] so we can discuss if and how the changes should be implemented.

## License

[MIT License](./LICENSE)

<!-- Links -->

[prismic]: https://prismic.io

<!-- TODO: Replace link with a more useful one if available -->

[nuxt-docs]: https://v3.prismic.nuxtjs.org
[prismic-docs]: https://prismic.io/docs/technical-reference/prismicio-vue?version=v3
[changelog]: ./CHANGELOG.md
[contributing]: ./CONTRIBUTING.md

<!-- TODO: Replace link with a more useful one if available -->

[forum-question]: https://community.prismic.io
[repo-bug-report]: https://github.com/nuxt-modules/prismic/issues/new?assignees=&labels=bug&template=bug_report.md&title=
[repo-feature-request]: https://github.com/nuxt-modules/prismic/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=
[repo-pull-requests]: https://github.com/nuxt-modules/prismic/pulls

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/prismic/latest.svg
[npm-version-href]: https://npmjs.com/package/@nuxtjs/prismic
[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxtjs/prismic.svg
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/prismic
[github-actions-ci-src]: https://github.com/nuxt-modules/prismic/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/nuxt-modules/prismic/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-modules/prismic.svg
[codecov-href]: https://codecov.io/gh/nuxt-modules/prismic
[conventional-commits-src]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg
[conventional-commits-href]: https://conventionalcommits.org
[license-src]: https://img.shields.io/npm/l/@nuxtjs/prismic.svg
[license-href]: https://npmjs.com/package/@nuxtjs/prismic

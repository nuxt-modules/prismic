# Contributing

This package is primarily maintained by [Prismic](https://prismic.io). External contributions are welcome. Ask for help by [opening an issue](https://github.com/nuxt-modules/prismic/issues/new/choose), or request a review by opening a pull request.

## :gear: Setup

<!-- When applicable, list system requriements to work on the project. -->

The following setup is required to work on this project:

- Node.js 24 or later
- npm CLI

## :memo: Project-specific notes

<!-- Share information about the repository. -->
<!-- What specific knowledge do contributors need? -->

> [!TIP]
> Please update this section with helpful notes for contributors.

## :construction_worker: Develop

> [!NOTE]
> It's highly recommended to discuss your changes with the maintainers before starting by [opening an issue](https://github.com/nuxt-modules/prismic/issues/new/choose).
>
> A short discussion can accellerate your work and ship it faster.

```sh
# Clone and prepare the project.
git clone git@github.com:nuxt-modules/prismic.git
cd prismic
npm install

# Create a new branch for your changes (e.g. lh/fix-win32-paths).
git checkout -b <your-initials>/<feature-or-fix-description>

# Start the development watcher.
# Run this command while you are working on your changes.
node --run dev

# Build the project for production.
# Run this command when you want to see the production version.
node --run build

# Lint your changes before requesting a review. No errors are allowed.
node --run lint
# Some errors can be fixed automatically:
node --run lint -- --fix

# Format your changes before requesting a review. No errors are allowed.
node --run format

# Test your changes before requesting a review.
# All changes should be tested. No failing tests are allowed.
node --run test
# Run only unit tests (optionally in watch mode):
node --run unit
node --run unit:watch
# Run only type tests
node --run types
```

## :building_construction: Submit a pull request

> [!NOTE]
> Code will be reviewed by maintainers before merging.
>
> Request a review by opening a pull request.

```sh
# Open a pull request. This example uses the GitHub CLI.
gh pr create

# Maintainers will review your work. This review will at least consider
# the PR's general direction, code style, and test coverage.

# Prereleases are published to npm automatically to upon pushing commits.
# Install the prerelease using the `pr-${number}` tag.
npm install @nuxtjs/prismic@pr-101

# When ready, PRs should be merged using the "Squash and merge" option.
```

## :rocket: Publish

> [!CAUTION]
> Publishing is restricted to maintainers.

This repository uses [Release Please](https://github.com/googleapis/release-please). To publish changes in `master`, merge [the pending Release Please PR](https://github.com/nuxt-modules/prismic/pulls?q=is%3Apr+is%3Aopen+label%3A%22autorelease%3A+pending%22).

If you don't see a pending PR, there are no changes to publish from `master`.

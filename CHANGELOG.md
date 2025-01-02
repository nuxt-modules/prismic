# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.4.7](https://github.com/nuxt-modules/prismic/compare/v3.4.6...v3.4.7) (2025-01-02)


### Chore

* cleanup playground ([6c55467](https://github.com/nuxt-modules/prismic/commit/6c554671e5490f71cb1edffb70b52159d75dad3e))
* **deps:** maintain dependencies ([154a5cb](https://github.com/nuxt-modules/prismic/commit/154a5cb8a87ed02bbc5a40cd606dbf98aa371dd0))

### [3.4.6](https://github.com/nuxt-modules/prismic/compare/v3.4.5...v3.4.6) (2024-12-05)


### Bug Fixes

* **deps:** remove consola dependency in runtime dir ([983a4dd](https://github.com/nuxt-modules/prismic/commit/983a4dd4f890dcda19dc014914794e3080d534c8))

### [3.4.5](https://github.com/nuxt-modules/prismic/compare/v3.4.4...v3.4.5) (2024-12-05)


### Bug Fixes

* compile logger correctly ([ff535fb](https://github.com/nuxt-modules/prismic/commit/ff535fb1110a123fccde2e6088e355ca0c0eb7b6))


### Chore

* **deps:** fix lock file ([d996855](https://github.com/nuxt-modules/prismic/commit/d996855b565e5fe1dc79906ece3aba91d676c468))

### [3.4.4](https://github.com/nuxt-modules/prismic/compare/v3.4.3...v3.4.4) (2024-12-03)


### Bug Fixes

* disable Prismic module gracefully on custom client resolution error ([#224](https://github.com/nuxt-modules/prismic/issues/224)) ([359dcee](https://github.com/nuxt-modules/prismic/commit/359dceec3bf44f929310748a5245c86e5185fb53))

### [3.4.3](https://github.com/nuxt-modules/prismic/compare/v3.4.2...v3.4.3) (2024-10-03)


### Bug Fixes

* use plugin client ([52fcdf1](https://github.com/nuxt-modules/prismic/commit/52fcdf1a304b27e29dba9d9bd277782c0ac9f11d))

### [3.4.2](https://github.com/nuxt-modules/prismic/compare/v3.4.1...v3.4.2) (2024-10-03)


### Bug Fixes

* use stable `client.repositoryName` ([f186e9d](https://github.com/nuxt-modules/prismic/commit/f186e9d3637bb13f0ce89ad9cd16941c07eed4ad))


### Chore

* **deps:** maintain dependencies ([ffd09b4](https://github.com/nuxt-modules/prismic/commit/ffd09b4d00ad52566e64d25a702a1abb57e6278d))

### [3.4.1](https://github.com/nuxt-modules/prismic/compare/v3.4.0...v3.4.1) (2024-09-16)


### Bug Fixes

* types for runtime/plugin.ts not being created correctly ([#220](https://github.com/nuxt-modules/prismic/issues/220)) ([28ddc1a](https://github.com/nuxt-modules/prismic/commit/28ddc1a88157454a528ea68ac5e720c97db829d7))


### Chore

* **deps:** maintain dependencies ([b1c1b9a](https://github.com/nuxt-modules/prismic/commit/b1c1b9a483fcbbab6999ee464123eddbdc035f57))

## [3.4.0](https://github.com/nuxt-modules/prismic/compare/v3.3.2...v3.4.0) (2024-08-31)


### Features

* allow factory function for customClient ([#219](https://github.com/nuxt-modules/prismic/issues/219)) ([bd7d02d](https://github.com/nuxt-modules/prismic/commit/bd7d02d86813b2ec5502cbe1cbdba2ed8839878c))


### Chore

* **deps:** maintain dependencies ([e244648](https://github.com/nuxt-modules/prismic/commit/e244648a43a60480ab2a4cc904739cbfb1962f05))
* **deps:** maintain dependencies ([191e2d4](https://github.com/nuxt-modules/prismic/commit/191e2d4ec2b9c50b3f9da75ba7e7746da834f04f))
* **deps:** update @prismicio/client ([4c95bfc](https://github.com/nuxt-modules/prismic/commit/4c95bfca4bb955e46d49b303e338badd1de9cdc5))

### [3.3.2](https://github.com/nuxt-modules/prismic/compare/v3.3.1...v3.3.2) (2024-07-02)


### Bug Fixes

* also export options as `ModuleOptions`, resolves [#215](https://github.com/nuxt-modules/prismic/issues/215) ([169fc8f](https://github.com/nuxt-modules/prismic/commit/169fc8f5b46c79334aeeb200e7d68c3b6041d0f4))

### [3.3.1](https://github.com/nuxt-modules/prismic/compare/v3.3.0...v3.3.1) (2024-06-14)


### Bug Fixes

* incorrect key read on `slicemachine.config.json` ([1594324](https://github.com/nuxt-modules/prismic/commit/1594324ec4e21dbf4b1b517e763a69555b24c3c1))

## [3.3.0](https://github.com/nuxt-modules/prismic/compare/v3.2.1...v3.3.0) (2024-06-13)


### Features

* ease Nuxt 4 update by removing `app/` prefix from Prismic files ([e0669de](https://github.com/nuxt-modules/prismic/commit/e0669de6601381185cd8c2ec15763ca178780425))
* integrate with `@nuxtjs/eslint`, resolves [#213](https://github.com/nuxt-modules/prismic/issues/213) ([3089cc4](https://github.com/nuxt-modules/prismic/commit/3089cc4c109243d2d52be09e13866b21c1ccee18))


### Chore

* refresh project structure and fully migrate to pnpm ([1833e8e](https://github.com/nuxt-modules/prismic/commit/1833e8e8d934e02bea77d1d67ca246d4282462a4))


### Refactor

* `tsconfig.json` ([494b54a](https://github.com/nuxt-modules/prismic/commit/494b54a41bd1e57517eebd60b873f9dd9badbc64))
* migrate to `memfs` ([3edf88b](https://github.com/nuxt-modules/prismic/commit/3edf88be7c12b904b465c642b1980013437fd4d6))
* use pnpm workspaces ([0e7c98e](https://github.com/nuxt-modules/prismic/commit/0e7c98e406e4a2928e51fcf94d7fae052e1d8a3c))


### Documentation

* fix doc generation ([e418cff](https://github.com/nuxt-modules/prismic/commit/e418cffd806d78ebbadbcf019c46d4f2d30e5446))
* refresh docs ([a9dae6b](https://github.com/nuxt-modules/prismic/commit/a9dae6b4ceecbe1b8ce119ac649825f07f862c59))
* update readme badges ([db3cac6](https://github.com/nuxt-modules/prismic/commit/db3cac62cc57c64c8e3e41541008a66ed518c4af))

### [3.2.1](https://github.com/nuxt-modules/prismic/compare/v3.2.0...v3.2.1) (2024-04-09)


### Bug Fixes

* slice machine configuration not loading in production (cjs), fixes: [#212](https://github.com/nuxt-modules/prismic/issues/212) ([a704db2](https://github.com/nuxt-modules/prismic/commit/a704db25d244c20c6240ef293db8c0509d51fafc))


### Documentation

* use new `nuxi module add` command in installation ([#211](https://github.com/nuxt-modules/prismic/issues/211)) ([67c4991](https://github.com/nuxt-modules/prismic/commit/67c4991bf4399c4f812a5a02eb35452be0e6b7fe))


### Chore

* **deps:** maintain lock file ([817ad6a](https://github.com/nuxt-modules/prismic/commit/817ad6aea4a9b04eac4c7e4814feca2824411a7d))

## [3.2.0](https://github.com/nuxt-modules/prismic/compare/v3.1.1...v3.2.0) (2024-04-08)


### Features

* devtool integration for slicemachine ([#210](https://github.com/nuxt-modules/prismic/issues/210)) ([a04d52c](https://github.com/nuxt-modules/prismic/commit/a04d52ca9b1600ce7f7ac43aa8586405c9ec0942))

### [3.1.1](https://github.com/nuxt-modules/prismic/compare/v3.1.0...v3.1.1) (2024-03-26)


### Bug Fixes

* COEP error ([#209](https://github.com/nuxt-modules/prismic/issues/209)) ([0f2729a](https://github.com/nuxt-modules/prismic/commit/0f2729a33a56b8b80dc001234e37b529763c3deb))
* opt in to `import.meta.*` properties ([#208](https://github.com/nuxt-modules/prismic/issues/208)) ([fee3cbe](https://github.com/nuxt-modules/prismic/commit/fee3cbe3e9ac30bb1ae2eba55e922c5de3e85ebb))


### Documentation

* link to official doc ([57d9ebb](https://github.com/nuxt-modules/prismic/commit/57d9ebb1958e02219af2959bca2707fbee5674fe))
* update install step, fixes: [#206](https://github.com/nuxt-modules/prismic/issues/206) ([7ec855b](https://github.com/nuxt-modules/prismic/commit/7ec855b0d2399b7ad81014029a57182fe03e0050))


### Chore

* **deps:** maintain dependencies ([698bdde](https://github.com/nuxt-modules/prismic/commit/698bddeccb133e4fc47ee99ebcbcecbb620962c5))
* **deps:** maintain lockfile ([2505462](https://github.com/nuxt-modules/prismic/commit/2505462cc35624e21eb48816d48027642dd89a91))
* update minimal example ([4ce471f](https://github.com/nuxt-modules/prismic/commit/4ce471f6dceadc1f38729234e296dc3429a231eb))

## [3.1.0](https://github.com/nuxt-modules/prismic/compare/v3.0.3...v3.1.0) (2023-10-24)


### Features

* allow `endpoint` to be optional, fixes [#199](https://github.com/nuxt-modules/prismic/issues/199) ([0eb67c1](https://github.com/nuxt-modules/prismic/commit/0eb67c178825f286f48edf2bcf3a6e90d828c903))
* support environments ([#202](https://github.com/nuxt-modules/prismic/issues/202)) ([ec6dcc9](https://github.com/nuxt-modules/prismic/commit/ec6dcc9e22b338b8f54f0e98b1a0a07eac850935))


### Chore

* **deps:** maintain dependencies ([91c95c8](https://github.com/nuxt-modules/prismic/commit/91c95c8f3e87b4bfc9b147cc14fabf1dcbbf3d29))
* **deps:** update minimal example ([0e00bfc](https://github.com/nuxt-modules/prismic/commit/0e00bfc734469b9e218f5613969f03fa808c966b))

### [3.0.3](https://github.com/nuxt-modules/prismic/compare/v3.0.2...v3.0.3) (2023-09-26)


### Chore

* **deps:** maintain dependencies ([f293530](https://github.com/nuxt-modules/prismic/commit/f293530aafdb1cc6c839e80d79325a166b5f72cb))

### [3.0.2](https://github.com/nuxt-modules/prismic/compare/v3.0.1...v3.0.2) (2023-09-18)


### Bug Fixes

* refresh Nuxt data during preview on page change properly ([30bb9f8](https://github.com/nuxt-modules/prismic/commit/30bb9f83beddf449d305882d94d07aeae46617d0))


### Chore

* **deps:** maintain dependencies ([e7a6a2b](https://github.com/nuxt-modules/prismic/commit/e7a6a2b3b87742c6506a79da91a7f486e5b73dee))

### [3.0.1](https://github.com/nuxt-modules/prismic/compare/v3.0.0...v3.0.1) (2023-06-21)


### Bug Fixes

* cleanup stale preview cookie from toolbar when disabled ([3f3c9f2](https://github.com/nuxt-modules/prismic/commit/3f3c9f20f66aaa6d0d2b5fdab99626546a523f34))


### Documentation

* minimal reproduction starter ([a397b81](https://github.com/nuxt-modules/prismic/commit/a397b8162e16e95fd0dc4a75b5c735b5775774d6))
* nuxt 2 doc link ([217f4f1](https://github.com/nuxt-modules/prismic/commit/217f4f15e304b5f8a61ece34f4476736bd38ae0a))
* remove starter readme ([87f73fb](https://github.com/nuxt-modules/prismic/commit/87f73fb6409d464cbe4c1ec1fe393408cbfbc4c1))
* update 0.index.md ([fa72cfb](https://github.com/nuxt-modules/prismic/commit/fa72cfb8d51fa7914a26d89e41150ccf40d8c9d7))
* update readme ([6f2affb](https://github.com/nuxt-modules/prismic/commit/6f2affb20304d04062cbebc3f3b1ecb13c981d3d))

## [3.0.0](https://github.com/nuxt-modules/prismic/compare/v3.0.0-rc.9...v3.0.0) (2023-06-06)


### Documentation

* Nuxt 2 doc ([2612001](https://github.com/nuxt-modules/prismic/commit/2612001697b597eeaade823b33d86ef6875f60c3))
* update doc ([238ae4d](https://github.com/nuxt-modules/prismic/commit/238ae4ddfb116b333dd238c00365914cd3459246))

## [3.0.0-rc.9](https://github.com/nuxt-modules/prismic/compare/v3.0.0-rc.8...v3.0.0-rc.9) (2023-06-05)


### Bug Fixes

* **vite:** exclude `@prismicio/vue` from pre-bundling ([b95dca2](https://github.com/nuxt-modules/prismic/commit/b95dca2bab294a81f5673ecd008bf27057d76d49))


### Documentation

* fix changelog ([aa5b0fa](https://github.com/nuxt-modules/prismic/commit/aa5b0fa0bde555a05126ac0b5aad9baef3df437d))

## [3.0.0-rc.8](https://github.com/nuxt-modules/prismic/compare/v3.0.0-rc.7...v3.0.0-rc.8) (2023-06-02)


### ⚠ BREAKING CHANGES

* update `@prismicio/vue` (#194)

### Features

* update `@prismicio/vue` ([#194](https://github.com/nuxt-modules/prismic/issues/194)) ([55996a4](https://github.com/nuxt-modules/prismic/commit/55996a49b4d0ecfbeb258f56c5aa467242b7a5f2))


### Chore

* GitHub org change ([d56bc86](https://github.com/nuxt-modules/prismic/commit/d56bc867040d6abd752e807be68c822297d0b3c3))


### Documentation

* remove warning ([9d91b66](https://github.com/nuxt-modules/prismic/commit/9d91b66f4d45847309884b7526e3f58a8b7ba53c))

## [3.0.0-rc.7](https://github.com/nuxt-modules/prismic/compare/v3.0.0-rc.6...v3.0.0-rc.7) (2023-05-16)


### Bug Fixes

* **plugins:** await Nuxt ready state before previewing data ([cf31e04](https://github.com/nuxt-modules/prismic/commit/cf31e04081cbc303698ce910868911f35695e30e))

## [3.0.0-rc.6](https://github.com/nuxt-modules/prismic/compare/v3.0.0-rc.5...v3.0.0-rc.6) (2023-05-15)


### Bug Fixes

* don't use alias to inject config to preserve runtime reactivity, resolves [#192](https://github.com/nuxt-modules/prismic/issues/192) ([6846c07](https://github.com/nuxt-modules/prismic/commit/6846c07a4395845111c3c8809a1414b6543a877d))

## [3.0.0-rc.5](https://github.com/nuxt-modules/prismic/compare/v3.0.0-rc.4...v3.0.0-rc.5) (2023-05-05)


### Features

* add full support of nuxt public runtime config ([a73f575](https://github.com/nuxt-modules/prismic/commit/a73f57577a3b69a1ec3fc6398020f638f90d60de))


### Refactor

* **playground:** use public runtime config in playground app ([304f656](https://github.com/nuxt-modules/prismic/commit/304f656018fcea02fb4274f5145c9bfe6c297a87))


### Chore

* **deps:** maintain dependencies ([9413ef1](https://github.com/nuxt-modules/prismic/commit/9413ef1407c151fc530c575e3e5ed4a7836bfc5d))
* update to consola v3 ([bb61327](https://github.com/nuxt-modules/prismic/commit/bb61327100e9b1814fdc80fb1796c6321cc36079))

## [3.0.0-rc.4](https://github.com/nuxt-modules/prismic/compare/v3.0.0-rc.3...v3.0.0-rc.4) (2023-03-30)


### Bug Fixes

* explicitely import utilities in module runtime ([9e9af4b](https://github.com/nuxt-modules/prismic/commit/9e9af4b67f5572724e214fa3cb28eb95fed24789))

## [3.0.0-rc.3](https://github.com/nuxt-modules/prismic/compare/v3.0.0-rc.2...v3.0.0-rc.3) (2023-03-28)


### Features

* allow configuring module at runtime using environment variables ([3328125](https://github.com/nuxt-modules/prismic/commit/33281256034a2038e840869dffb2836a4a2797c1))
* inject Vue plugin into Nuxt app ([c12457e](https://github.com/nuxt-modules/prismic/commit/c12457ef9e6076c83612019f444de7547c830267))


### Documentation

* add link resolver warning ([cd6e497](https://github.com/nuxt-modules/prismic/commit/cd6e497a13e5a4f8313d26f9d7cfcbabcc340cb8))


### Refactor

* inject toolbar script from plugin ([cbab6c8](https://github.com/nuxt-modules/prismic/commit/cbab6c89473e6eff9c19746e791a0f4d520c625a))


### Chore

* **deps:** add missing package ([dcab0b8](https://github.com/nuxt-modules/prismic/commit/dcab0b8e7e4feb8328b9d3402e892d8ed5744ea2))
* **deps:** maintain dependencies ([1d289e3](https://github.com/nuxt-modules/prismic/commit/1d289e3d128a58b71c16b505b70d36b8c08c4135))
* **deps:** maintain dependencies ([e54cae3](https://github.com/nuxt-modules/prismic/commit/e54cae359b33becf3b5ed145a7099c6350f731e0))

## [3.0.0-rc.2](https://github.com/nuxt-modules/prismic/compare/v3.0.0-rc.1...v3.0.0-rc.2) (2022-11-17)


### Chore

* **deps:** update to Nuxt 3 ([884d067](https://github.com/nuxt-modules/prismic/commit/884d067cc41f00a414eef24474d9d9e7168745df))

## [3.0.0-rc.1](https://github.com/nuxt-modules/prismic/compare/v3.0.0-rc.0...v3.0.0-rc.1) (2022-09-05)


### Documentation

* fix meta ([a7ec956](https://github.com/nuxt-modules/prismic/commit/a7ec956a2aff17f4aa1b86fa10ec1a5102a19c46))


### Chore

* enable prerelease support ([233eb3a](https://github.com/nuxt-modules/prismic/commit/233eb3a5ae5bf8cd37ec0001be3abf6c9439bd6f))
* GitHub org change ([70dbd28](https://github.com/nuxt-modules/prismic/commit/70dbd28257f9bf4518000f4c610383adad4070a4))

## [3.0.0-rc.0](https://github.com/nuxt-modules/prismic/compare/v3.0.0-alpha.10...v3.0.0-rc.0) (2022-07-18)

### Features

- allow disabling toolbar ([0b4e6c0](https://github.com/nuxt-modules/prismic/commit/0b4e6c00382d2085d52304503fa6e3f21939b33c))

### Refactor

- extract utils into `lib` ([3168bda](https://github.com/nuxt-modules/prismic/commit/3168bdaf47a537d30f276bf8dafc0b3a16b7d00f))

### Chore

- **deps:** maintain dependencies ([aa71ca9](https://github.com/nuxt-modules/prismic/commit/aa71ca93691bd78802f22f943233b10c92174ddb))
- **deps:** maintain dependencies ([7530502](https://github.com/nuxt-modules/prismic/commit/753050273a5148230e28daa5630453318bf448ca))

### Documentation

- disable github ([e545f50](https://github.com/nuxt-modules/prismic/commit/e545f507bf47b1f37488351b4cd49bba02c88440))
- fix new docs ([#166](https://github.com/nuxt-modules/prismic/issues/166)) ([51affea](https://github.com/nuxt-modules/prismic/commit/51affea19b1082bf780eb4d15052f3e98cf72160))
- install with rc tag ([8495424](https://github.com/nuxt-modules/prismic/commit/8495424d69fa35d1e269ea0cb8fa41700f2b006e))
- revamp doc ([9aa9d69](https://github.com/nuxt-modules/prismic/commit/9aa9d690e1604a31e759d6c849501ececd7b155e))

## [3.0.0-alpha.10](https://github.com/nuxt-modules/prismic/compare/v3.0.0-alpha.9...v3.0.0-alpha.10) (2022-07-01)

### Bug Fixes

- explicitely declare dependencies for runtime directory ([aa38cf9](https://github.com/nuxt-modules/prismic/commit/aa38cf97ee628e7209232db0e14b1a3ba66fd636))

## [3.0.0-alpha.9](https://github.com/nuxt-modules/prismic/compare/v3.0.0-alpha.8...v3.0.0-alpha.9) (2022-07-01)

### Bug Fixes

- explicitely declare dependencies for runtime directory ([94dbf70](https://github.com/nuxt-modules/prismic/commit/94dbf702e54db33e0044d209ae9d2df2cd143efa))

## [3.0.0-alpha.8](https://github.com/nuxt-modules/prismic/compare/v3.0.0-alpha.7...v3.0.0-alpha.8) (2022-07-01)

### Features

- add full preview support (experimental) ([79ecbd3](https://github.com/nuxt-modules/prismic/commit/79ecbd3acbd4ea7df7d2d24c99db386d76d86865))

## [3.0.0-alpha.7](https://github.com/nuxt-modules/prismic/compare/v3.0.0-alpha.6...v3.0.0-alpha.7) (2022-07-01)

### Bug Fixes

- load Prismic toolbar through Nuxt 3 API ([6393fb2](https://github.com/nuxt-modules/prismic/commit/6393fb28a1b2df1ed71a9a530dcc3c10e7f8a0ba))

## [3.0.0-alpha.6](https://github.com/nuxt-modules/prismic/compare/v3.0.0-alpha.5...v3.0.0-alpha.6) (2022-06-28)

### Bug Fixes

- explicitely declare dependencies for runtime directory ([204e628](https://github.com/nuxt-modules/prismic/commit/204e628007f0b00fab68702ffe194d6f7df7460c))

### Refactor

- provide composable for prismic previews ([26bf287](https://github.com/nuxt-modules/prismic/commit/26bf287d3c1204ca1d17ab499712f0bbdd17c9b0))

### Documentation

- update `nuxt3` to `nuxt` ([#161](https://github.com/nuxt-modules/prismic/issues/161)) ([c71a56c](https://github.com/nuxt-modules/prismic/commit/c71a56c5f6a9b089f67fbf2791c4b461abc9f1ac))

### Chore

- **deps:** maintain dependencies ([45a1d1f](https://github.com/nuxt-modules/prismic/commit/45a1d1fea866d73ab68efb957ca164c123a70522))
- **deps:** maintain dependencies ([f668af9](https://github.com/nuxt-modules/prismic/commit/f668af9086998a1c592eca98bd851e40be5487f6))

## [3.0.0-alpha.5](https://github.com/nuxt-modules/prismic/compare/v3.0.0-alpha.4...v3.0.0-alpha.5) (2022-04-21)

### Bug Fixes

- proxy user-provided files instead of duplicating them to support TypeScript ([bd5d176](https://github.com/nuxt-modules/prismic/commit/bd5d176d7feb18cb2e5f0bd85ba72962c9e86181))
- temporary hardcode package name ([#160](https://github.com/nuxt-modules/prismic/issues/160)) ([326724e](https://github.com/nuxt-modules/prismic/commit/326724e2ba3b16c1068a05eb67948eb76cc96da1))

### Chore

- **deps:** maintain dependencies ([9d24d66](https://github.com/nuxt-modules/prismic/commit/9d24d665e3a33af962d84a6ac59f3e2d689b9b2c))
- update playground ([0fa6574](https://github.com/nuxt-modules/prismic/commit/0fa65742535eb8257122080802994c30de727b50))

## [3.0.0-alpha.4](https://github.com/nuxt-modules/prismic/compare/v3.0.0-alpha.3...v3.0.0-alpha.4) (2022-04-20)

### Features

- support providing runtime HTML Serializer ([e6e6d13](https://github.com/nuxt-modules/prismic/commit/e6e6d13ae66569e8d4a6c5f252ebefd7826098c4))

### Chore

- **deps:** maintain dependencies ([3a8fc36](https://github.com/nuxt-modules/prismic/commit/3a8fc36ca2112127818fd42c3d208f66ece05be9))
- **deps:** maintain dependencies ([878005e](https://github.com/nuxt-modules/prismic/commit/878005ef88fb6040775424fecd339656e8de732e))

### [1.4.2](https://github.com/nuxt-modules/prismic/compare/v1.4.1...v1.4.2) (2022-04-08)

### Bug Fixes

- disable nuxtI18n preventively on preview page, fixes [#90](https://github.com/nuxt-modules/prismic/issues/90) ([7ee7f29](https://github.com/nuxt-modules/prismic/commit/7ee7f293ca50f501b7de1ea79635b1af47f2a4d6))

## [3.0.0-alpha.3](https://github.com/nuxt-modules/prismic/compare/v3.0.0-alpha.2...v3.0.0-alpha.3) (2022-04-06)

### Bug Fixes

- force `@prismicio/vue` transpilation ([ead4eb1](https://github.com/nuxt-modules/prismic/commit/ead4eb1071e47c6e175bc557003f4fef22e214cb))

### Chore

- **deps:** maintain dependencies ([e4008ee](https://github.com/nuxt-modules/prismic/commit/e4008ee75c1742bbf04b79d5c14e32ef5f514057))

### Refactor

- `useMeta()` is now `useHead()` ([86c1a26](https://github.com/nuxt-modules/prismic/commit/86c1a261c49992a78c3f3ca92c474f4f61f41ad5))

## [3.0.0-alpha.2](https://github.com/nuxt-modules/prismic/compare/v3.0.0-alpha.1...v3.0.0-alpha.2) (2022-03-24)

### Features

- support user-defined client & link resolvers ([e8ce69b](https://github.com/nuxt-modules/prismic/commit/e8ce69b58a597645f60bcb04d35a66500ad7f792))

### Bug Fixes

- use `<NuxtLink />` properly ([eed8a80](https://github.com/nuxt-modules/prismic/commit/eed8a809194be548fbebbb99475050f5afda269a))

### Chore

- **deps:** maintain dependencies ([1670ba9](https://github.com/nuxt-modules/prismic/commit/1670ba9eaac329a4434ffe214e9be6b7aa71dfb1))

### [1.4.1](https://github.com/nuxt-modules/prismic/compare/v1.4.0...v1.4.1) (2022-03-22)

### Documentation

- advertise Nuxt 3 version ([c010a55](https://github.com/nuxt-modules/prismic/commit/c010a55a8985da32cfce50d1b01d7a1cf308cf44))
- link styling ([cd3fc8f](https://github.com/nuxt-modules/prismic/commit/cd3fc8f4f5ce10a9db90be177ea6994d08d91928))

### Chore

- feature-proof Nuxt 2 module ([dc1b582](https://github.com/nuxt-modules/prismic/commit/dc1b582db9974e1b1e5cf9086427217afb5e03f3))

## [3.0.0-alpha.1](https://github.com/nuxt-modules/prismic/compare/v3.0.0-alpha.0...v3.0.0-alpha.1) (2022-02-21)

### Features

- use nuxt component auto import ([c1f23a1](https://github.com/nuxt-modules/prismic/commit/c1f23a146e6a30f35d0aa3b9d91ccc549c3eb539))

### Documentation

- `buildModules` is deprecated actually ([e818e47](https://github.com/nuxt-modules/prismic/commit/e818e47cd1a0cc8c5f14a5d79874a645002c94ea))

## [3.0.0-alpha.0](https://github.com/nuxt-modules/prismic/compare/v1.3.2...v3.0.0-alpha.0) (2022-02-16)

### ⚠ BREAKING CHANGES

- prepare structure for Nuxt 3 support

### Features

- add basic preview support ([13ca4fa](https://github.com/nuxt-modules/prismic/commit/13ca4faf224379472c1b68af07e77a501b8ef0f9))
- load plugin and composables ([b1be73d](https://github.com/nuxt-modules/prismic/commit/b1be73dbea4b761c3d69b19782b024fb10162b73))

### Refactor

- update to nuxt-builder ([9b25020](https://github.com/nuxt-modules/prismic/commit/9b250206622f74ad2b6dd4f0d72bd97e8a1a2244))

### Chore

- **deps:** fix version ([cb9cdf4](https://github.com/nuxt-modules/prismic/commit/cb9cdf487fe108be41398ef675fd02771944f127))
- **deps:** maintain dependencies ([4d804b8](https://github.com/nuxt-modules/prismic/commit/4d804b868c95489a412da266409441ac0da5006d))
- prepare structure for Nuxt 3 support ([4d59509](https://github.com/nuxt-modules/prismic/commit/4d59509c4d63664875ed67f0b4b29f88831ecda6))
- set up basic utilities ([12701fa](https://github.com/nuxt-modules/prismic/commit/12701fae71e4a85a8f6f5a2ab6f2db276d1557c3))
- update playground ([68fa51a](https://github.com/nuxt-modules/prismic/commit/68fa51ac6e50234b90d43f77a39db3f0bdc099f8))

### Documentation

- add doc site ([713b0b8](https://github.com/nuxt-modules/prismic/commit/713b0b81765269db0813ced31bc11242be467654))
- remove doc ([18f6d26](https://github.com/nuxt-modules/prismic/commit/18f6d263d715b385bbd285f602e0f7b53e086917))
- update doc ([573b479](https://github.com/nuxt-modules/prismic/commit/573b4793528999d286f04bd2b5ee3b042127e1e2))
- update url ([3af4276](https://github.com/nuxt-modules/prismic/commit/3af427651cdde2ddf9746ecd02390f401487caf3))

## [1.4.0](https://github.com/nuxt-modules/prismic/compare/v1.3.2...v1.4.0) (2021-12-06)

### Features

- hot reload previews for smoother workflow ([5575e92](https://github.com/nuxt-modules/prismic/commit/5575e92c1015f626347386daa9ba2512ff13d12a))

### Chore

- update github template ([2fb354c](https://github.com/nuxt-modules/prismic/commit/2fb354c62ef3b63acb04d752b26824cd4e117113))

### Documentation

- update doc ([0109bd3](https://github.com/nuxt-modules/prismic/commit/0109bd38e8ccaf3e3a5d91d5ca9f3f340394f9aa))

### [1.3.2](https://github.com/nuxt-modules/prismic/compare/v1.3.1...v1.3.2) (2021-11-02)

### Chore

- **deps:** maintain dependencies ([fc8e0fb](https://github.com/nuxt-modules/prismic/commit/fc8e0fb3f51b6a569cadf283d3228219666d835f))

### [1.3.1](https://github.com/nuxt-modules/prismic/compare/v1.3.0...v1.3.1) (2021-05-20)

### Bug Fixes

- handle `nuxt.router.base` options when resolving previews ([#140](https://github.com/nuxt-modules/prismic/issues/140)) ([63d3fee](https://github.com/nuxt-modules/prismic/commit/63d3fee4c90a47e4e7b525e676a6024e05313f53))

## [1.3.0](https://github.com/nuxt-modules/prismic/compare/v1.3.0-alpha.1...v1.3.0) (2021-05-10)

### Chore

- add .versionrc ([0da1249](https://github.com/nuxt-modules/prismic/commit/0da1249ca56b48bf76c2151b1ebe4f2f3a470ed1))
- typo ([ac264f0](https://github.com/nuxt-modules/prismic/commit/ac264f03f14b0539c996f508e0d202729cded874))
- update pull request template ([ce7d103](https://github.com/nuxt-modules/prismic/commit/ce7d103db3b07d24ea1dea5167e3454220ef8f33))

## [1.3.0-alpha.1](https://github.com/nuxt-modules/prismic/compare/v1.3.0-alpha.0...v1.3.0-alpha.1) (2021-05-04)

### Features

- add modern option, fixes [#134](https://github.com/nuxt-modules/prismic/issues/134) ([02112e1](https://github.com/nuxt-modules/prismic/commit/02112e1e0b81103fb410f2dab3416b1d1adaee47))

## [1.3.0-alpha.0](https://github.com/nuxt-modules/prismic/compare/v1.2.6...v1.3.0-alpha.0) (2021-05-04)

### Features

- drop node 8 & 10 ([9f4192c](https://github.com/nuxt-modules/prismic/commit/9f4192c601f7a2c38ca3783ba596907828d36015))

> ⚠️ That's a breaking change, to some extent. We're following Nuxt's choice of not making those majors: https://github.com/nuxt/nuxt.js/releases/tag/v2.15.0

### Bug Fixes

- prevent fatal error if endpoint is not provided ([b79e26b](https://github.com/nuxt-modules/prismic/commit/b79e26b58318d04812ca45f8684b7bc09f29e4a7))

### [1.2.6](https://github.com/nuxt-modules/prismic/compare/v1.2.5...v1.2.6) (2021-03-11)

### [1.2.5](https://github.com/nuxt-modules/prismic/compare/v1.2.4...v1.2.5) (2021-03-09)

### Bug Fixes

- preview not persisting after navigation ([#129](https://github.com/nuxt-modules/prismic/issues/129)) ([6f60b21](https://github.com/nuxt-modules/prismic/commit/6f60b21d596306585391ffde7a662b1a87fdbf11))

### [1.2.4](https://github.com/nuxt-modules/prismic/compare/v1.2.3...v1.2.4) (2020-09-10)

### Bug Fixes

- use custom preview page if exists ([#101](https://github.com/nuxt-modules/prismic/issues/101)) ([39d9dd5](https://github.com/nuxt-modules/prismic/commit/39d9dd55a9e9c3540c6a377cb3e484121466265d))

### [1.2.3](https://github.com/nuxt-modules/prismic/compare/v1.2.1...v1.2.3) (2020-07-17)

### Bug Fixes

- handle nuxt globalname option ([4d9e30b](https://github.com/nuxt-modules/prismic/commit/4d9e30b1ae53c1718cde23844ef8a9d87d39c840))
- prevent fatal on api failure ([2d3f043](https://github.com/nuxt-modules/prismic/commit/2d3f0430aaf38ecf8686806cf85fa1faaaba1782))

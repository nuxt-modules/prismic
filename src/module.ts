import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

import {
	addComponent,
	addImports,
	addPlugin,
	addTemplate,
	createResolver,
	defineNuxtModule,
	extendPages,
	getNuxtVersion,
	useLogger,
} from "@nuxt/kit"
import type { ClientConfig } from "@prismicio/client"
import { defu } from "defu"

/**
 * Prismic Nuxt module options.
 *
 * @see {@link https://prismic.io/docs/nuxt}
 * @see {@link https://prismic.io/docs/technical-reference/nuxtjs-prismic}
 */
export type PrismicModuleOptions = {
	/**
	 * The Prismic repository name or full Content API endpoint to init the
	 * module's client instance used to fetch content from a Prismic repository
	 * with.
	 *
	 * @example
	 *
	 * ```typescript
	 * // With a repository name
	 * createClient("my-repo")
	 *
	 * // With a full Prismic Content API endpoint
	 * createClient("https://my-repo.cdn.prismic.io/api/v2")
	 * ```
	 *
	 * @see {@link https://prismic.io/docs/technical-reference/prismicio-client}
	 */
	endpoint?: string

	/**
	 * The Prismic environment in use by Slice Machine configured through
	 * environment variables.
	 *
	 * @defaultValue `endpoint` value.
	 *
	 * @internal
	 */
	environment?: string

	/**
	 * Configuration options that determines how content will be queries from the
	 * Prismic repository.
	 *
	 * @see {@link https://prismic.io/docs/technical-reference/prismicio-client}
	 */
	clientConfig?: ClientConfig

	/**
	 * An optional path to a file exporting a Prismic client instance used to
	 * fetch content from a Prismic repository to configure the module with.
	 *
	 * @remarks
	 * When provided, it takes precedence over the `endpoint` and `clientConfig`
	 * options.
	 *
	 * @see {@link https://prismic.io/docs/technical-reference/prismicio-client}
	 */
	client?: string

	/**
	 * Desired path of the preview page used by Prismic to enter preview session.
	 *
	 * @remarks
	 * `false` can be used to disable the preview page.
	 *
	 * @defaultValue `"/preview"`
	 */
	preview?: string | false

	/**
	 * Whether to inject Prismic toolbar script.
	 *
	 * @remarks
	 * The toolbar script is required for previews to work.
	 *
	 * @defaultValue `true`
	 */
	toolbar?: boolean

	/** Options used by Prismic Vue components. */
	componentsConfig?: {
		/**
		 * The path to a file exporting a default link resolver function used to
		 * resolve links.
		 *
		 * @see {@link https://prismic.io/docs/routes}
		 */
		linkResolver?: string

		/**
		 * The path to a file exporting default components or shorthand definitions
		 * for rich text and table components.
		 *
		 * @see {@link https://prismic.io/docs/fields/rich-text}
		 * @see {@link https://prismic.io/docs/fields/table}
		 */
		defaultComponents?: string
	}
}

/**
 * Prismic Nuxt module options.
 *
 * @see {@link https://prismic.io/docs/nuxt}
 * @see {@link https://prismic.io/docs/technical-reference/nuxtjs-prismic}
 */
export type ModuleOptions = PrismicModuleOptions

declare module "@nuxt/schema" {
	interface PublicRuntimeConfig {
		/** The Prismic Nuxt module options. */
		prismic: PrismicModuleOptions
	}
}

export default defineNuxtModule<PrismicModuleOptions>({
	meta: {
		name: "@nuxtjs/prismic",
		configKey: "prismic",
		compatibility: { nuxt: ">=3.7.0" },
	},
	defaults: (nuxt) => {
		const nuxt3flavor =
			getNuxtVersion(nuxt).startsWith("3") &&
			!nuxt.options?.future?.compatibilityVersion

		if (nuxt3flavor) {
			return {
				endpoint: "u",
				environment: "",
				clientConfig: {},
				client: "~/app/prismic/client",
				preview: "/preview",
				toolbar: true,
				componentsConfig: {
					linkResolver: "~/app/prismic/linkResolver",
					defaultComponents: "~/app/prismic/defaultComponents",
				},
			}
		}

		return {
			endpoint: "",
			environment: "",
			client: "~/prismic/client",
			clientConfig: {},
			preview: "/preview",
			toolbar: true,
			componentsConfig: {
				linkResolver: "~/prismic/linkResolver",
				defaultComponents: "~/prismic/defaultComponents",
			},
		}
	},
	setup(options, nuxt) {
		const resolver = createResolver(import.meta.url)
		const logger = useLogger("nuxt:prismic")

		const moduleOptions: PrismicModuleOptions = defu(
			nuxt.options.runtimeConfig.public?.prismic,
			options,
		)

		exposeRuntimeConfig()
		transpileDependencies()
		const ok = proxyUserFiles()
		if (!ok) return
		addRuntimePlugins()
		addAutoImports()
		addPreviewRoute()
		extendESLintConfig()

		function exposeRuntimeConfig() {
			nuxt.options.runtimeConfig.public ||=
				{} as typeof nuxt.options.runtimeConfig.public
			nuxt.options.runtimeConfig.public.prismic = moduleOptions
		}

		function transpileDependencies() {
			nuxt.options.build.transpile.push(
				resolver.resolve("runtime"),
				"@nuxtjs/prismic",
				"@prismicio/vue",
			)
			nuxt.options.vite.optimizeDeps ||= {}
			nuxt.options.vite.optimizeDeps.exclude ||= []
			nuxt.options.vite.optimizeDeps.exclude.push("@prismicio/vue")
		}

		function proxyUserFiles() {
			const proxyUserFileWithUndefinedFallback = (
				filename: string,
				path: string,
			): boolean => {
				const resolvedFilename = `prismic/proxy/${filename}.ts`
				const resolvedPath = path
					.replace(/^(~~|@@)/, nuxt.options.rootDir)
					.replace(/^(~|@)/, nuxt.options.srcDir)
				const maybeUserFile = fileExists(resolvedPath, [
					"js",
					"mjs",
					"ts",
					"vue",
				])

				if (maybeUserFile) {
					// If user file exists, proxy it with vfs
					logger.info(
						`Using user-defined \`${filename}\` at \`${maybeUserFile.replace(nuxt.options.srcDir, "~").replace(nuxt.options.rootDir, "~~").replace(/\\/g, "/")}\``,
					)

					addTemplate({
						filename: resolvedFilename,
						getContents: () => `export { default } from '${path}'`,
					})

					return true
				} else {
					// Else provide `undefined` fallback
					addTemplate({
						filename: resolvedFilename,
						getContents: () => "export default undefined",
					})

					return false
				}
			}

			const proxiedUserClient = proxyUserFileWithUndefinedFallback(
				"client",
				moduleOptions.client!,
			)
			if (
				!moduleOptions.endpoint &&
				!proxiedUserClient &&
				!process.env.NUXT_PUBLIC_PRISMIC_ENDPOINT
			) {
				logger.warn(
					`\`endpoint\` option is missing and \`${moduleOptions.client}\` was not found. At least one of them is required for the module to run. Disabling module...`,
				)
				return false
			}
			proxyUserFileWithUndefinedFallback(
				"linkResolver",
				moduleOptions.componentsConfig!.linkResolver!,
			)
			proxyUserFileWithUndefinedFallback(
				"defaultComponents",
				moduleOptions.componentsConfig!.defaultComponents!,
			)

			return true
		}

		function addRuntimePlugins() {
			addPlugin(resolver.resolve("runtime/plugin"))
			addPlugin(resolver.resolve("runtime/plugin.client"))
		}

		function addAutoImports() {
			// Components
			;[
				"PrismicImage",
				"PrismicLink",
				"PrismicText",
				"PrismicRichText",
				"PrismicTable",
				"SliceZone",
			].forEach((entry) => {
				addComponent({
					name: entry,
					export: entry,
					filePath: "@prismicio/vue",
				})
			})

			// Composables and utils
			addImports(
				[
					"usePrismic",
					"getSliceComponentProps",
					"defineSliceZoneComponents",
					"getRichTextComponentProps",
					"getTableComponentProps",
				].map((entry) => ({ name: entry, as: entry, from: "@prismicio/vue" })),
			)
			addImports({
				name: "usePrismicPreview",
				as: "usePrismicPreview",
				from: resolver.resolve("runtime/usePrismicPreview"),
			})
		}

		function addPreviewRoute() {
			if (moduleOptions.preview) {
				const maybeUserPreviewPage = fileExists(
					join(
						nuxt.options.srcDir,
						nuxt.options.dir.pages,
						moduleOptions.preview,
					),
					["js", "ts", "vue"],
				)

				if (maybeUserPreviewPage) {
					logger.info(
						`Using user-defined preview page at \`${maybeUserPreviewPage
							.replace(join(nuxt.options.srcDir), "~")
							.replace(nuxt.options.rootDir, "~~")
							.replace(
								/\\/g,
								"/",
							)}\`, available at \`${moduleOptions.preview}\``,
					)
				} else {
					logger.info(
						`Using default preview page, available at \`${moduleOptions.preview}\``,
					)

					extendPages((pages) => {
						pages.unshift({
							name: "prismic-preview",
							path: moduleOptions.preview as string, // Checked before
							file: resolver.resolve("runtime/PrismicPreview.vue"),
						})
					})
				}

				if (!moduleOptions.toolbar) {
					logger.warn(
						"`toolbar` option is disabled but `preview` is enabled. Previews won't work unless you manually load the toolbar.",
					)
				}
			}
		}

		function extendESLintConfig() {
			nuxt.hook(
				// @ts-expect-error 3rd party hook
				"eslint:config:addons",
				(
					addons: {
						name: string
						getConfigs: () => Promise<{ configs: string[] }>
					}[],
				) => {
					addons.push({
						name: "@nuxtjs/prismic",
						async getConfigs() {
							const configPath = resolver.resolve(
								nuxt.options.rootDir,
								"slicemachine.config.json",
							)

							const configs: string[] = []

							try {
								if (existsSync(configPath)) {
									const config = JSON.parse(await readFile(configPath, "utf-8"))

									if (
										config &&
										"libraries" in config &&
										Array.isArray(config.libraries)
									) {
										configs.push(
											JSON.stringify({
												files: config.libraries.map(
													(library: string) =>
														`${library.replace("./", "")}/**/index.vue`,
												),
												rules: {
													"vue/multi-word-component-names": "off",
												},
											}),
										)
									}
								}
							} catch {
								// noop
							}

							return { configs }
						},
					})
				},
			)
		}
	},
})

function fileExists(path?: string, extensions = ["js", "ts"]): string | null {
	if (!path) {
		return null
	} else if (existsSync(path)) {
		return path
	}

	const extension = extensions.find((extension) =>
		existsSync(`${path}.${extension}`),
	)

	return extension ? `${path}.${extension}` : null
}

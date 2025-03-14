// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PrismicPluginOptions, SliceComponentProps, TODOSliceComponent } from '@prismicio/vue'

/**
 * `@nuxtjs/prismic` module options.
 *
 * @see Module documentation: {@link https://prismic.nuxtjs.org}
 * @see Prismic documentation: {@link https://prismic.io/docs/nuxt-3-setup}
 */
export type PrismicModuleOptions = Omit<
	PrismicPluginOptions,
	'endpoint' | 'client' | 'linkResolver' | 'richTextSerializer' | 'components'
> & {
	/**
	 * A Prismic repository endpoint to init the module's `@prismicio/client`
	 * instance used to fetch content from a Prismic repository with.
	 *
	 * @remarks
	 * Said client will be used exposed through `this.$prismic.client` and
	 * `usePrismic().client`.
	 * @example
	 *
	 * ```javascript
	 * // A repository ID
	 * "my-repo";
	 *
	 * //A full repository endpoint
	 * "https://my-repo.cdn.prismic.io/api/v2";
	 * ```
	 *
	 * @see Prismic client documentation {@link https://prismic.io/docs/technical-reference/prismicio-client}
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
	 * An optional path to a file exporting a `@prismicio/client` instance used
	 * to fetch content from a Prismic repository to configure the module with.
	 *
	 * @remarks
	 * Said client will be used exposed through `this.$prismic.client` and
	 * `usePrismic().client`.
	 * @see Prismic client documentation {@link https://prismic.io/docs/technical-reference/prismicio-client}
	 */
	client?: string

	/**
	 * An optional path to a file exporting a link resolver function used to
	 * resolve links to Prismic documents when not using the route resolver
	 * parameter with `@prismicio/client`.
	 *
	 * @see Link resolver documentation {@link https://prismic.io/docs/route-resolver#link-resolver}
	 */
	linkResolver?: string

	/**
	 * An optional path to a file exporting an HTML serializer to customize
	 * the way rich text fields are rendered.
	 *
	 * @deprecated Use `components.richTextComponents` instead.
	 *
	 * @see HTML serializer documentation {@link https://prismic.io/docs/rich-text}
	 */
	richTextSerializer?: string

	/**
	 * Desired path of the preview page used by Prismic to enter preview
	 * session.
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

	/**
	 * Whether to enable Prismic Nuxt DevTools integration.
	 *
	 * @defaultValue `true`
	 */
	devtools?: boolean

	/**
	 * Options used by Prismic Vue components.
	 */
	components?: Omit<
		Required<PrismicPluginOptions>['components'],
		'richTextComponents' | 'linkRel' | 'sliceZoneDefaultComponent' | 'linkInternalComponent' | 'linkExternalComponent'
	> & {
		/**
		 * An optional path to a file exporting the `rel` attribute to apply on links.
		 * It can export a function to use the link's metadata to determine the `rel` value.
		 *
		 * @defaultValue `"noreferrer"` for external links.
		 */
		linkRel?: string

		/**
		 * An optional path to a file exporting a map of Rich Text block types to Vue Components.
		 * It is used to render Rich Text or title fields.
		 *
		 * @see Templating Rich Text and title fields from Prismic {@link https://prismic.io/docs/rich-text}
		 */
		richTextComponents?: string

		/**
		 * An optional path to a file exporting a component or a functional component rendered
		 * if a component mapping from the `components` prop cannot be found.
		 *
		 * @remarks
		 * Components will be rendered using the {@link SliceComponentProps} interface.
		 *
		 * @defaultValue `null` when `process.env.NODE_ENV === "production"` else {@link TODOSliceComponent}
		 */
		sliceZoneDefaultComponent?: string
	}
}

import { join } from "upath";
import { addPluginTemplate, defineNuxtModule } from "@nuxt/kit";

import { PrismicModuleOptions } from "./types";

export default defineNuxtModule<PrismicModuleOptions>({
	meta: {
		name: "@nuxtjs/prismic",
		configKey: "prismic",
		compatibility: { nuxt: "^3.0.0" },
	},
	defaults: {
		endpoint: "",
		clientConfig: {},
		linkResolver: undefined,
		htmlSerializer: undefined,
		injectComponents: true,
		components: {
			linkInternalComponent: "nuxt-link",
		},
	},
	schema: {},
	hooks: {},
	async setup(mergedOptions, _nuxt) {
		addPluginTemplate({
			fileName: "prismic/prismic-plugin.js",
			src: join(__dirname, "../templates/prismic-plugin.js"),
			options: mergedOptions,
		});
	},
});

export { usePrismic } from "@prismicio/vue";

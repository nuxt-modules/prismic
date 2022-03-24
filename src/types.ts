import { PrismicPluginOptions } from '@prismicio/vue'

export type PrismicModuleOptions = Omit<PrismicPluginOptions, "endpoint" | "client" | "linkResolver"> & {
	endpoint: string,
	client?: string,
	linkResolver?: string,
	preview?: string | false,
};

import { PrismicPluginOptions } from '@prismicio/vue'

export type PrismicModuleOptions = Omit<PrismicPluginOptions, 'endpoint' | 'client' | 'linkResolver' | 'htmlSerializer'> & {
	endpoint: string;
	client?: string;
	linkResolver?: string;
	htmlSerializer?: string;
	preview?: string | false;
	toolbar?: boolean;
};

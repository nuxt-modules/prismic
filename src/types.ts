import { PrismicPluginOptions } from '@prismicio/vue'

export type PrismicModuleOptions = Omit<PrismicPluginOptions, 'endpoint' | 'client' | 'linkResolver' | 'htmlSerializer' | 'richTextSerializer'> & {
	endpoint: string;
	client?: string;
	linkResolver?: string;
	richTextSerializer?: string;
	preview?: string | false;
	toolbar?: boolean;
};

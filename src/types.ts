import { PrismicPluginOptions } from '@prismicio/vue'

type Preview = {
	url: string;
	script: boolean;
}

export type PrismicModuleOptions = Omit<PrismicPluginOptions, 'endpoint' | 'client' | 'linkResolver' | 'htmlSerializer'> & {
	endpoint: string;
	client?: string;
	linkResolver?: string;
	htmlSerializer?: string;
	preview?: Preview | false;
};

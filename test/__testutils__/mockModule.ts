import { Nuxt, NuxtModule } from '@nuxt/schema'

export const mockModule = <TModuleOptions extends Record<string, any>>(
	moduleDefinition: NuxtModule<TModuleOptions>
): (options?: Partial<TModuleOptions>) => { nuxt: Nuxt } => {
	return moduleDefinition as unknown as (options?: Partial<TModuleOptions>) => { nuxt: Nuxt }
}

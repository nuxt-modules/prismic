import type { Nuxt, NuxtModule } from '@nuxt/schema'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockModule = <TModuleOptions extends Record<string, any>>(
	moduleDefinition: NuxtModule<TModuleOptions>,
): (options?: Partial<TModuleOptions>) => { nuxt: Nuxt } => {
	return moduleDefinition as unknown as (options?: Partial<TModuleOptions>) => { nuxt: Nuxt }
}

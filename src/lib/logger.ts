import { useLogger } from '@nuxt/kit'

export const logger = useLogger('nuxt:prismic') as ReturnType<typeof useLogger>

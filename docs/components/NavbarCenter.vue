<script setup lang="ts">
import { computed, useDocus, useContentHelpers, useRoute } from '#imports'

const route = useRoute()
const { navBottomLink } = useContentHelpers()
const { navigation, theme } = useDocus()

const hasNavigation = computed(() => !!theme.value.aside?.level)

const filtered = computed(() => theme.value?.aside?.filter || [])

const tree = computed(() => {
	return (navigation.value || []).filter((item) => {
		if (filtered.value.includes(item._path)) {
			return false
		}
		return true
	})
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isActive = (link: any) => (link.exact ? route.fullPath === link._path : route.fullPath.startsWith(link._path))
</script>

<template>
  <nav
    v-if="hasNavigation"
    class="flex max-w-full flex-1 items-center justify-center gap-8 overflow-hidden truncate py-1 font-medium"
  >
    <NuxtLink
      v-for="link in tree"
      :key="link._path"
      :to="navBottomLink(link)"
      class="text-sm"
      :class="[isActive(link) ? 'text-primary-500' : 'u-text-gray-500 hover:u-text-gray-700']"
    >
      {{ link?.navigation?.title || link.title }}
    </NuxtLink>
    <NuxtLink
      to="https://github.com/nuxt-modules/prismic/blob/master/CHANGELOG.md#readme"
      class="text-sm u-text-gray-500 hover:u-text-gray-700 inline-flex items-center space-x-0.5 group"
    >
      <span>Changelog</span>
      <Icon
        name="heroicons-solid:external-link"
        class="opacity-0 group-hover:opacity-100"
      />
    </NuxtLink>
  </nav>
</template>

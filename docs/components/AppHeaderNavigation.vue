<script setup lang="ts">
const tree = ref([
	{ title: 'Get Started', redirect: 'https://prismic.io/docs/nuxt-3-setup', icon: 'heroicons-outline:lightning-bolt' },
	{ title: 'Module Reference', redirect: 'https://prismic.io/docs/technical-reference/nuxtjs-prismic/v4', icon: 'heroicons-outline:book-open' },
])
</script>

<template>
	<nav>
		<ul>
			<li
				v-for="link in tree"
				:key="link.redirect"
			>
				<NuxtLink
					class="link"
					:to="link.redirect"
					target="_blank"
				>
					<Icon
						:name="link.icon"
					/>
					{{ link.title }}
				</NuxtLink>
			</li>
		</ul>
	</nav>
</template>

<style scoped lang="ts">
css({
  nav: {
    display: 'none',
    '@lg': {
      display: 'block'
    },
    ul: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '1',
      maxWidth: '100%',
      truncate: true,

      '& > * + *': {
        marginLeft: '{space.2}'
      },

      li: {
        display: 'inline-flex',
        gap: '{space.1}',
      },

      '.link': {
        display: 'flex',
        alignItems: 'center',
        gap: '{space.2}',
        padding: '{space.2} {space.4}',
        fontSize: '{fontSize.sm}',
        borderRadius: '{radii.md}',
        outline: 'none',
        transition: 'background 200ms ease',

        svg: {
          display: 'inline-block'
        },

        '&:active,&.active,&:hover': {
          backgroundColor: '{color.gray.100}',
          '@dark': {
            backgroundColor: '{color.gray.900}',
          },
        },

        '&.active': {
          boxShadow: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
          fontWeight: '{fontWeight.semibold}'
        }
      }
    }
  }
})
</style>

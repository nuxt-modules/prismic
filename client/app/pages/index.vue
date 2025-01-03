<script setup lang="ts">
import type { RPCClientType } from '../../../src/devtools/types'

const props = defineProps<{
	rpc: RPCClientType
}>()

const { status, start, stop, config } = await useSlicemachine(props.rpc)
</script>

<template>
	<div class="relative p-4 n-bg-base space-y-4">
		<header>
			<h1 class="inline-block rounded border border-zinc-600 bg-zinc-900 p-1.5 heading text-m">
				<span class="i-simple-icons:prismic align-sub" /> @nuxtjs/prismic
			</h1>
		</header>

		<main class="grid grid-cols-2 grid-auto-flow gap-4">
			<NCard class="col-span-2 p-4 space-y-4">
				<h2 class="text-m heading">
					<span class="i-carbon:tools-alt align-sub" /> Slicemachine
				</h2>
				<section class="flex gap-2">
					<SlicemachineStatusTip
						:running="status.running"
						class="flex-1"
					/>
					<NButton @click="status.running ? stop() : start()">
						{{ status.running ? 'Stop' : 'Start' }} Slicemachine
					</NButton>
				</section>
			</NCard>
			<NCard class="p-4 space-y-4">
				<h2 class="text-m heading">
					<span class="i-carbon:notebook-reference align-sub" /> Documentation
				</h2>
				<h3>Nuxt</h3>
				<p class="flex gap-2 flex-wrap">
					<NButton
						to="https://prismic.io/docs/content-modeling"
						icon="i-carbon-ruler-alt"
						target="_blank"
					>
						Model Content
					</NButton>
					<NButton
						to="https://prismic.io/docs/nuxt-3-define-routes"
						icon="i-carbon-3d-curve-manual"
						target="_blank"
					>
						Define Routes
					</NButton>
					<NButton
						to="https://prismic.io/docs/nuxt-3-fetch-data"
						icon="i-carbon-download"
						target="_blank"
					>
						Fetch Data
					</NButton>
					<NButton
						to="https://prismic.io/docs/nuxt-3-template-content"
						icon="i-carbon-paint-brush"
						target="_blank"
					>
						Template Content
					</NButton>
				</p>
				<h3>APIs</h3>
				<p class="flex gap-2 flex-wrap">
					<NButton
						to="https://prismic.io/docs/technical-reference/prismicio-client"
						icon="i-carbon-satellite-radar"
						target="_blank"
					>
						@prismicio/client
					</NButton>
					<NButton
						to="https://prismic.io/docs/technical-reference/prismicio-vue"
						icon="i-carbon-logo-vue"
						target="_blank"
					>
						@prismicio/vue
					</NButton>
					<NButton
						to="https://prismic.nuxtjs.org/"
						icon="i-simple-icons-nuxtdotjs"
						target="_blank"
					>
						@nuxtjs/prismic
					</NButton>
				</p>
			</NCard>
			<NCard
				v-if="config && 'repositoryName' in config && config.repositoryName"
				class="p-4 space-y-4"
			>
				<h2 class="text-m heading">
					<span class="i-carbon:tools-alt align-sub" /> Repository
				</h2>
				<p class="flex gap-2 flex-wrap">
					<NButton
						:to="`https://${config.repositoryName}.prismic.io/builder/working`"
						icon="i-carbon-book"
						target="_blank"
					>
						Documents
					</NButton>
					<NButton
						:to="`https://${config.repositoryName}.prismic.io/builder/medias`"
						icon="i-carbon-image"
						target="_blank"
					>
						Media Library
					</NButton>
					<NButton
						:to="`https://${config.repositoryName}.prismic.io/settings/repository`"
						icon="i-carbon-settings"
						target="_blank"
					>
						Settings
					</NButton>
				</p>
			</NCard>
		</main>
	</div>
</template>

<style scoped>
.heading {
	@apply font-bold uppercase tracking-wider font-mono;
}
</style>

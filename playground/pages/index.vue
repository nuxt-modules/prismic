<script setup lang="ts">
import { usePrismic, useAsyncData, refreshNuxtData } from '#imports'

const { client } = usePrismic()
const { data: doc, pending } = await useAsyncData('doc', async () => {
	// eslint-disable-next-line no-console
	console.log('start:doc')

	const kitchen = await client.getSingle('kitchen_sink_2')

	// eslint-disable-next-line no-console
	console.log('end:doc')

	return kitchen
})
</script>

<template>
	<div>
		<div
			@click="() => refreshNuxtData()"
		>
			Pending: {{ pending }}
		</div>
		<div v-if="!pending">
			<!-- <prismic-link
				v-slot="{ href }"
				:field="doc?.data.relation"
			>
				{{ href }} foo
			</prismic-link>
			<prismic-link
				v-slot="{ href }"
				:field="{ link_type: 'Web', url: 'https://google.com' }"
			>
				{{ href }} bar
			</prismic-link> -->
			<prismic-rich-text
				:field="doc?.data.richtext"
			/>
			<!-- <prismic-text :field="doc?.data.body[0].primary.title" /> -->
			<!-- <slice-zone :slices="doc?.data.body" /> -->
		</div>
	</div>
</template>

<style>
a {
	display: block;
}
</style>

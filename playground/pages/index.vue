<template>
	<div>
		<div>Pending: {{ pending }}</div>
		<div v-if="!pending">
			<prismic-link :field="doc.data.relation" v-slot="{ href }">{{ href }} foo</prismic-link>
			<prismic-link
				:field="{ link_type: 'Web', url: 'https://google.com' }"
				v-slot="{ href }"
			>{{ href }} bar</prismic-link>
			<!-- <prismic-text :field="home?.data.body[0].primary.title" /> -->
			<!-- <slice-zone :slices="home?.data.body" /> -->
		</div>
	</div>
</template>

<script setup lang="ts">
const { client } = usePrismic()
const { data: doc, pending } = await useAsyncData('doc', () => client.getSingle('kitchen_sink_2'))
</script>

<style>
a {
	display: block;
}
</style>

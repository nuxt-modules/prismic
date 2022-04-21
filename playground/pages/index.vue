<template>
	<div>
		<div>Pending: {{ pending }}</div>
		<div v-if="!pending">
			<prismic-link v-slot="{ href }"
				:field="doc.data.relation">
				{{ href }} foo
			</prismic-link>
			<prismic-link v-slot="{ href }"
				:field="{ link_type: 'Web', url: 'https://google.com' }">
				{{ href }} bar
			</prismic-link>
			<prismic-rich-text
				:field="doc.data.richtext" />
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

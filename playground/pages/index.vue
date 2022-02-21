<template>
	<div>
		<div>Pending: {{ pending }}</div>
		<div v-if="!pending">
			<prismic-text :field="home?.data.body[0].primary.title" />
			<slice-zone :slices="home?.data.body" />
		</div>
	</div>
</template>

<script setup lang="ts">
const { client } = usePrismic()
const { data: home, pending } = await useAsyncData('home', () => client.getByUID('page', 'home'))
</script>

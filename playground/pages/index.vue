<template>
	<div>
		<div>State: {{ state }}</div>
		<div v-if="state === 'success'">
			<prismic-text :field="home?.data.body[0].primary.title" />
			<slice-zone :slices="home?.data.body" />
		</div>
	</div>
</template>

<script setup lang="ts">
const { data: home, state } = usePrismicDocumentByUID('page', 'home')
</script>

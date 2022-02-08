<template>
	<div>
		<div>State: {{ state }}</div>
		<slice-zone v-if="state === 'success'" :slices="home?.data.body" />
	</div>
</template>

<script setup lang="ts">
const { data: home, state } = usePrismicDocumentByUID('page', 'home')
</script>

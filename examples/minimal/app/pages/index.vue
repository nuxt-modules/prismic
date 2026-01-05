<script setup lang="ts">
const { client } = usePrismic()

const { data: doc } = await useAsyncData("index", () =>
	client.getSingle("kitchen_sink"),
)
</script>

<template>
	<div>{{ doc?.id }} - {{ doc?.type }} - {{ doc?.last_publication_date }}</div>
</template>

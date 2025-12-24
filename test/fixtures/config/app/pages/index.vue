<script setup>
const prismic = usePrismic()
</script>

<template>
	<div>{{ prismic.client.repositoryName }}</div>
</template>

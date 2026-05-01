<script setup>
const { client } = usePrismic()
const routes = useRuntimeConfig().public.prismic.clientConfig?.routes ?? []
</script>

<template>
	<div>
		<div id="repository-name">{{ client.repositoryName }}</div>
		<div id="routes-count">{{ routes.length }}</div>
		<div id="route-path">{{ routes[0]?.path }}</div>
	</div>
</template>

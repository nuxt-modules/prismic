<script setup>
const { client } = usePrismic()

const { data: doc } = await useAsyncData("index", () =>
	client.getSingle("kitchen_sink"),
)
</script>

<template>
	<div>
		<div id="repository-name">{{ client.repositoryName }}</div>
		<div id="text"><PrismicText :field="doc?.data?.title" /></div>
		<div id="rich-text"><PrismicRichText :field="doc?.data?.body" /></div>
		<div id="image"><PrismicImage :field="doc?.data?.image" /></div>
		<div id="link"><PrismicLink :field="doc?.data?.link">link</PrismicLink></div>
		<div id="relationship"><PrismicLink :field="doc?.data?.relationship">relationship</PrismicLink></div>
	</div>
</template>


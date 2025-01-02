<script setup lang="ts">
import { usePrismic, useAsyncData, ref } from '#imports'

const prismic = usePrismic()

const { data: doc } = await useAsyncData('doc', () => prismic.client.getSingle('kitchen_sink'))
</script>

<template>
	<div>
		{{ doc?.id }} - {{ doc?.type }} - {{ doc?.last_publication_date }}
		<span
			:class="null"
			:data-foo="null"
		>null</span>
		<span
			:class="undefined"
			:data-foo="undefined"
		>undefined</span>
		<span
			:class="false"
			:data-foo="false"
		>false</span>
	</div>
</template>

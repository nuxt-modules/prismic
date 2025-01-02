<script setup lang="ts">
import { usePrismic, useAsyncData, ref } from '#imports'

const prismic = usePrismic()

const { data: doc } = await useAsyncData('doc', () => prismic.client.getSingle('kitchen_sink'))

const link = ref({ link_type: 'Web', key: 'ad8a212f-4faa-42d0-80dc-6a8495205000', url: 'https://awwwards.com/jankohlbach', target: '_blank', text: 'Awwwards' })
</script>

<template>
	<div>
		{{ doc?.id }} - {{ doc?.type }} - {{ doc?.last_publication_date }}
		<PrismicLink :field="link" />
		<PrismicLink :field="link" />
		<PrismicLink :field="link">
			hello
		</PrismicLink>
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

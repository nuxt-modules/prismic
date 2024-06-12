<script setup lang="ts">
import { usePrismic, useAsyncData } from '#imports'

const prismic = usePrismic()

const { data: doc } = await useAsyncData('doc', () => prismic.client.getSingle('kitchen_sink'))
</script>

<template>
  <div>
    {{ doc?.id }} - {{ doc?.type }} - {{ doc?.last_publication_date }}
  </div>
</template>

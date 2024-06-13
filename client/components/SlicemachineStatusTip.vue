<script setup lang="ts">
const props = defineProps<{
	running: boolean
}>()

const text = computed(() => {
	return props.running
		? 'Slicemachine has been started and available at'
		: 'Slicemachine has not been started yet'
})
</script>

<template>
	<NTip :n="running ? 'green' : 'yellow'">
		{{ text }}
		<a
			v-if="running"
			target="_blank"
			href="http://localhost:9999"
		>http://localhost:9999</a>
	</NTip>
</template>

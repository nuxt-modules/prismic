<template>
    <NTip :n="started ? 'green' : 'yellow'">
        {{ text }}

        <a v-if="started" target="_blank" href="http://localhost:9999">http://localhost:9999</a>
    </NTip>
</template>

<script setup lang="ts">

const props = defineProps<{
    started: boolean
}>()

const text = computed(() => {
    return props.started ? 'Slicemachine has been started and available at' : 'Slicemachine has not been started yet'
})
</script>
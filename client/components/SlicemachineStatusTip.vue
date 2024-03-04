<template>
    <NTip :n="started ? 'green' : 'yellow'">
        {{ text }}
    </NTip>
</template>

<script setup lang="ts">

const props = defineProps<{
    started: boolean
}>()

const text = computed(() => {
    return props.started ? 'Slicemachine has been started' : 'Slicemachine has not been started yet'
})
</script>
<script setup lang="ts">
import { useSlicemachine} from "../composables/slicemachine"
const props = defineProps<{
  rpc: RpcClientType
}>()
const { status, start, stop } = await useSlicemachine(props.rpc)
</script>

<template>
  <div class="relative p-10 n-bg-base flex flex-col h-screen">
    <h1 class="text-3xl font-bold">
      @nuxtjs/prismic
    </h1>

    <NCard
      class="flex  gap-2"
    >
    <SlicemachineStatusTip :started="status" class="flex-1" />
    <NButton @click="status ? stop() : start()">
      {{ status ? 'Stop' : 'Start' }} Slicemachine
    </NButton> 
    </NCard> 

  </div>
</template>

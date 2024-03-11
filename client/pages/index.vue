<script setup lang="ts">
import { useSlicemachine } from "../composables/slicemachine"
const props = defineProps<{
  rpc: RpcClientType
}>()

const { status, start, stop, config } = await useSlicemachine(props.rpc)
</script>

<template>
  <div class="relative p-4 n-bg-base flex flex-col gap-4 h-screen">
    <h1 class="text-3xl font-bold">
      <div class="i-logos:prismic-icon w-1em h-1em"></div> @nuxtjs/prismic
    </h1>

    <NCard class="py-4 grid gap-4">
      <div class="px-4">

        <h2 class="text-xl font-bold">Slicemachine</h2>
        <div class="flex gap-2">
          <SlicemachineStatusTip :started="status" class="flex-1" />
          <NButton @click="status ? stop() : start()">
            {{ status ? 'Stop' : 'Start' }} Slicemachine
          </NButton>
        </div>
      </div>

      <NSectionBlock text="Configuration" icon="carbon-checkmark">
        <NCodeBlock v-if="config" :lines="false" :code="JSON.stringify(config, null, 1)" lang="json" />
        <p v-else class="op-1/2">
          Slicemachine configuration file not found! Please create one at the root of your project.
        </p>
      </NSectionBlock>
    </NCard>
  </div>
</template>

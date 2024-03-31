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
      <span class="i-logos:prismic-icon" /> @nuxtjs/prismic
    </h1>

    <NCard class="grid gap-4">
      <h2 class="px-4 mt-4 text-xl font-bold">Slicemachine</h2>
      <section class="flex gap-2 mt-4 px-4">
        <SlicemachineStatusTip :started="status" class="flex-1" />
        <NButton @click="status ? stop() : start()">
          {{ status ? 'Stop' : 'Start' }} Slicemachine
        </NButton>
      </section>

      <NSectionBlock text="Configuration" icon="carbon:settings" class="border-b" :open="false" header-class="hover:op100">
        <NCodeBlock v-if="config" :lines="false" :code="JSON.stringify(config, null, 1)" lang="json" />
        <p v-else class="op-1/2">
          Slicemachine configuration file not found! Please create one at the root of your project.
        </p>
      </NSectionBlock>
    </NCard>
  </div>
</template>

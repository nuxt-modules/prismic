<template>
  <div>
    <NuxtPage v-if="hasRpc" :rpc="rpcClient" />
    <div v-else>
      <div class="i-logos:prismic-icon w-1em h-1em"></div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onDevtoolsClientConnected } from '@nuxt/devtools-kit/iframe-client'
import { SliceMachineStatus, type ISlicemachineClientFunctions, type ISlicemachineServerFunctions } from '../src/devtools/types'
import { ref } from "vue"
import type { RpcClientType } from '#imports';
import { useSlicemachineState } from './composables/slicemachine';
const RPC_NAMESPACE = 'prismic-slicemachine-rpc'

const slicemachineState = useSlicemachineState()

const rpcClient = ref<RpcClientType>()
onDevtoolsClientConnected(async (client) => {
  const rpc = client.devtools.extendClientRpc<ISlicemachineServerFunctions, ISlicemachineClientFunctions>(RPC_NAMESPACE, {
    updateStatus(status) {
      console.log(status, 'yolo')
      if (status === SliceMachineStatus.STARTED) {
        slicemachineState.value = true
      }
      else {

        slicemachineState.value = false
      }
    },
  })
  rpcClient.value = rpc

})

const hasRpc = computed(() => {
  return rpcClient.value !== undefined
})

</script>
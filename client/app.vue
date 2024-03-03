<template>
  <div>*
    <NuxtPage v-if="rpcClient !== undefined" :rpc="rpcClient" />
    <div v-else>
      <div class="i-logos:prismic-icon w-1em h-1em"></div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onDevtoolsClientConnected } from '@nuxt/devtools-kit/iframe-client'
import type { ISlicemachineClientFunctions, ISlicemachineServerFunctions } from '../src/devtools/types'
import { ref } from "vue"
import type { RpcClientType } from '#imports';
const RPC_NAMESPACE = 'prismic-slicemachine-rpc'

const rpcClient = ref<RpcClientType>()
watch(rpcClient, console.log)
onDevtoolsClientConnected(async (client) => {
  const rpc = client.devtools.extendClientRpc<ISlicemachineServerFunctions, ISlicemachineClientFunctions>(RPC_NAMESPACE, {

  })
  rpcClient.value = rpc
  console.log(rpcClient.value, 'rpc')

})

</script>
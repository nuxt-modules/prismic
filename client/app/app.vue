<template>
	<NuxtLayout>
		<NuxtPage
			v-if="rpcClient"
			:rpc="rpcClient"
		/>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { onDevtoolsClientConnected } from '@nuxt/devtools-kit/iframe-client'

import {
	RPC_NAMESPACE,
	SliceMachineStatus,
	type RPCClientType,
	type ISlicemachineClientFunctions,
	type ISlicemachineServerFunctions,
} from '../../src/devtools/types'

const sliceMachineStatus = useSliceMachineStatus()

const rpcClient = ref<RPCClientType>()

onDevtoolsClientConnected((client) => {
	rpcClient.value = client.devtools.extendClientRpc<ISlicemachineServerFunctions, ISlicemachineClientFunctions>(
		RPC_NAMESPACE,
		{
			updateStatus(status) {
				sliceMachineStatus.value.running = status === SliceMachineStatus.STARTED
			},
		},
	)
})
</script>

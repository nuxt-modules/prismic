import type { RPCClientType } from '../../src/devtools/types'

export const useSliceMachineStatus = () => useState(
	'prismic-slice-machine-running',
	() => ({ running: false })
)

export const useSlicemachine = async (rpc: RPCClientType) => {
	const _status = useSliceMachineStatus()
	_status.value.running = await rpc.isSliceMachineStarted()
	const _config = await rpc.getSlicemachineConfig()

	return {
		status: computed(() => _status.value),
		start: rpc.startSliceMachine,
		stop: rpc.stopSliceMachine,
		config: ref(_config)
	}
}

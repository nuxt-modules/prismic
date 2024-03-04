
const STATUS_KEY = 'sm-status'

export const useSlicemachineState = () => useState(STATUS_KEY, () => false)

export async  function useSlicemachine(rpc:RpcClientType) {

    const _status = useSlicemachineState()

    _status.value = await rpc.isSliceMachineStarted()
    
    const status = computed(() => _status.value)

    return {
        status,
        start:   rpc.startSliceMachine,
        stop: rpc.stopSliceMachine
    }
}
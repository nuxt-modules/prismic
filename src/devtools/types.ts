import type { BirpcReturn } from 'birpc'

export const RPC_NAMESPACE = 'prismic-slicemachine-rpc'

export enum SliceMachineStatus {
	STARTED,
	STOPPED,
}

export interface ISlicemachineClientFunctions {
	updateStatus(status: SliceMachineStatus): void
}

export interface ISlicemachineServerFunctions {
	getSlicemachineConfig(): Promise<object | null>
	isSliceMachineStarted(): boolean
	startSliceMachine(): SliceMachineStatus
	stopSliceMachine(): SliceMachineStatus
}

export type RPCServerType = BirpcReturn<ISlicemachineClientFunctions, ISlicemachineServerFunctions>
export type RPCClientType = BirpcReturn<ISlicemachineServerFunctions, ISlicemachineClientFunctions>

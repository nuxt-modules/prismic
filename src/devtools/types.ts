import type { BirpcReturn } from 'birpc'

export enum SliceMachineStatus {
	STARTED,
	STOPPED
}

export interface ISlicemachineClientFunctions {
	updateStatus(status: SliceMachineStatus) : void
}

export interface ISlicemachineServerFunctions {
	getSlicemachineConfig() : Promise<Object | null>
	isSliceMachineStarted() : boolean
	startSliceMachine() : SliceMachineStatus
	stopSliceMachine() : SliceMachineStatus
}

export type RpcServerType = BirpcReturn<ISlicemachineClientFunctions, ISlicemachineServerFunctions>

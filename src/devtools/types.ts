import type { BirpcReturn} from "birpc"

export interface ISlicemachineClientFunctions {
    updateStatus(status: SliceMachineStatus) : void
}

export enum SliceMachineStatus {
    STARTED,
    STOPPED
}

export interface ISlicemachineServerFunctions {
    getSlicemachineConfig() : Promise<Object | null>
	isSliceMachineStarted() : boolean
	startSliceMachine() : Promise<SliceMachineStatus>
	stopSliceMachine() : Promise<SliceMachineStatus>
}

export type RpcServerType = BirpcReturn<ISlicemachineClientFunctions, ISlicemachineServerFunctions>

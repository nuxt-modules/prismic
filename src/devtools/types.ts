import type { BirpcReturn} from "birpc"

export interface ISlicemachineClientFunctions {
    updateStatus(status: SliceMachineStatus) : void
}

export enum SliceMachineStatus {
    NO_CHANGE,
    STARTED,
    STOPPED
}

export interface ISlicemachineServerFunctions {
	isSliceMachineStarted() : boolean
	startSliceMachine() : Promise<SliceMachineStatus>
	stopSliceMachine() : Promise<SliceMachineStatus>
}

export type RpcServerType = BirpcReturn<ISlicemachineClientFunctions, ISlicemachineServerFunctions>

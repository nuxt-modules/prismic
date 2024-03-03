
export interface ISlicemachineClientFunctions {

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
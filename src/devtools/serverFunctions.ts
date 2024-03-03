import { SliceMachineStatus, type ISlicemachineServerFunctions } from "./types"
import { exec, type ChildProcess } from "child_process"
let process: null|ChildProcess  = null

export const serverFunctions: ISlicemachineServerFunctions =  {
    isSliceMachineStarted() {
      return process !== null
    },
    async startSliceMachine() {
        if (process) {
            return SliceMachineStatus.NO_CHANGE
        }

       process =  exec(`npx slicemachine`)
        
        return SliceMachineStatus.STARTED
    },
   async  stopSliceMachine() {
    if(process) {
        process.kill()
        return SliceMachineStatus.STOPPED
    }

    

    return SliceMachineStatus.NO_CHANGE
    }
  }

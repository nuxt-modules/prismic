import type { BirpcReturn} from "birpc"
import type { ISlicemachineServerFunctions, ISlicemachineClientFunctions } from "../../src/devtools/types"


export type RpcClientType = BirpcReturn<ISlicemachineServerFunctions, ISlicemachineClientFunctions>
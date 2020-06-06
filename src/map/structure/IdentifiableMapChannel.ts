import { Channel } from "@wildebeest/observable"
import { Change } from "../../change/Change"

export interface IdentifiableMapChannel<T, U> extends Channel<Change<U>> {
    get(): Map<T, U>;
}

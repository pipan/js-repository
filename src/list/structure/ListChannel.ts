import { Channel } from "@wildebeest/observable"
import { Change } from "../../change/Change"

export interface ListChannel<T> extends Channel<Change<T>> {
    get (): Array<T>;
}

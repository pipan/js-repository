import { Channel } from "@wildebeest/observable"
import { Change } from "../../change/Change"
import { MapEntry } from "../MapEntry"

export interface MapChannel<T, U> extends Channel<Change<MapEntry<T, U>>> {
    get(): Map<T, U>;
}

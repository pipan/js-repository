import { MapEntry } from "../MapEntry"
import { Change } from "../../change/Change"
import { SimpleChange } from "../../change/SimpleChange"
import { Pipable } from "@wildebeest/observable"

export class FilterMissingRemoved<T, U> implements Pipable<Change<MapEntry<T, U>>> {
    private map: Map<T, U>

    public constructor (map: Map<T, U>) {
        this.map = map
    }

    public execute (change: Change<MapEntry<T, U>>): Change<MapEntry<T, U>> {
        const removed: Array<MapEntry<T, U>> = []
        for (const toRemove of change.removed()) {
            if (!this.map.has(toRemove.getKey())) {
                continue
            }
            removed.push(toRemove)
        }

        return new SimpleChange(change.inserted(), removed)
    }
}

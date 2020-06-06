import { MapEntry } from "../MapEntry"
import { Change } from "../../change/Change"
import { SimpleChange } from "../../change/SimpleChange"
import { Pipable } from "@wildebeest/observable"

export class CreateRemoveEventForReplace<T, U> implements Pipable<Change<MapEntry<T, U>>> {
    private map: Map<T, U>

    public constructor (map: Map<T, U>) {
        this.map = map
    }

    public execute (change: Change<MapEntry<T, U>>): Change<MapEntry<T, U>> {
        const removed: Array<MapEntry<T, U>> = change.removed()
        for (const toInsert of change.inserted()) {
            if (!this.map.has(toInsert.getKey())) {
                continue
            }
            removed.push(new MapEntry(toInsert.getKey(), this.map.get(toInsert.getKey())))
        }

        return new SimpleChange(change.inserted(), removed)
    }
}

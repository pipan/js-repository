import { MapEntry } from "../MapEntry"
import { Change } from "../../change/Change"
import { SimpleChange } from "../../change/SimpleChange"
import { Pipable } from "@wildebeest/observable"

export class FilterDuplicateValue<T, U> implements Pipable<Change<MapEntry<T, U>>> {
    private map: Map<T, U>

    public constructor (map: Map<T, U>) {
        this.map = map
    }

    public execute (change: Change<MapEntry<T, U>>): Change<MapEntry<T, U>> {
        const duplicates: Map<T, U> = new Map()

        const inserted: Array<MapEntry<T, U>> = []
        for (const toInsert of change.inserted()) {
            if (this.map.has(toInsert.getKey()) && this.map.get(toInsert.getKey()) === toInsert.getValue()) {
                duplicates.set(toInsert.getKey(), toInsert.getValue())
                continue
            }
            inserted.push(toInsert)
        }

        const removed: Array<MapEntry<T, U>> = []
        for (const toRemove of change.removed()) {
            if (duplicates.has(toRemove.getKey())) {
                continue
            }
            removed.push(toRemove)
        }

        return new SimpleChange(inserted, removed)
    }
}

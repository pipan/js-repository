import { MapEntry } from "../MapEntry"
import { Change } from "../../change/Change"
import { SimpleChange } from "../../change/SimpleChange"
import { Pipable } from "@wildebeest/observable"

export class FilterDuplicateInsert<T, U> implements Pipable<Change<MapEntry<T, U>>> {
    public execute (change: Change<MapEntry<T, U>>): Change<MapEntry<T, U>> {
        const insertedMap: Map<T, U> = new Map()
        for (const toInsert of change.inserted()) {
            insertedMap.set(toInsert.getKey(), toInsert.getValue())
        }

        const inserted: Array<MapEntry<T, U>> = []
        insertedMap.forEach((value: U, key: T) => {
            inserted.push(new MapEntry(key, value))
        })

        return new SimpleChange(inserted, change.removed())
    }
}
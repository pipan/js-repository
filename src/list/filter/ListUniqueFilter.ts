import { ListChange } from "../ListChange"
import { Pipable } from "@wildebeest/observable"

export class ListUniqueFilter<T> implements Pipable<ListChange<T>> {
    public execute (change: ListChange<T>): ListChange<T> {
        const source: Array<T> = change.source()
        const toRemove: Array<T> = []
        for (const removed of change.removed()) {
            if (source.indexOf(removed) < 0) {
                continue
            }
            if (toRemove.indexOf(removed) > -1) {
                continue
            }
            toRemove.push(removed)
        }

        const toInsert: Array<T> = []
        for (const inserted of change.inserted()) {
            if (source.indexOf(inserted) > -1) {
                continue
            }
            if (toInsert.indexOf(inserted) > -1) {
                continue
            }
            toInsert.push(inserted)
        }

        return new ListChange(source, toInsert, toRemove)
    }
}
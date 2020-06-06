import { Change } from "../../change/Change";
import { SimpleChange } from "../../change/SimpleChange";
import { Pipable } from "@wildebeest/observable";

export class FilterMissingRemoved<T> implements Pipable<Change<T>> {
    private list: Array<T>

    public constructor (list: Array<T>) {
        this.list = list
    }

    public execute (change: Change<T>): Change<T> {
        const toRemove: Array<T> = []
        for (const removed of change.removed()) {
            if (this.list.indexOf(removed) === -1) {
                continue
            }
            toRemove.push(removed)
        }

        return new SimpleChange(change.inserted(), toRemove)
    }
}

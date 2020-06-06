import { ListChange } from "../ListChange";
import { Comparable } from "../../compare/Comparable";
import { Pipable } from "@wildebeest/observable";

export class ApplyOrderedChange<T> implements Pipable<ListChange<T>> {
    protected compare: Comparable<T>

    public constructor (compare: Comparable<T>) {
        this.compare = compare
    }

    public execute (change: ListChange<T>): ListChange<T> {
        const data: Array<T> = [...change.source()]

        const removed: Array<T> = []
        for (const toRemove of change.removed()) {
            const index: number = data.indexOf(toRemove)
            if (index === -1) {
                continue
            }
            removed.push(toRemove)
            data.splice(index, 1)
        }

        for (const toInsert of change.inserted()) {
            const index: number = this.getInsertIndex(data, toInsert)
            if (index === -1) {
                data.push(toInsert)
            } else {
                data.splice(index, 0, toInsert)
            }
        }

        return new ListChange(data, change.inserted(), removed)
    }

    private getInsertIndex(data: Array<T>, toInsert: T): number {
        let index: number = 0
        for (const item of data) {
            if (this.compare.compare(toInsert, item) < 0) {
                return index;
            }
            index++
        }
        return -1
    }
}
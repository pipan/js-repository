import { SimpleListChannel } from "./SimpleListChannel";
import { Change } from "../../change/Change";
import { Comparable } from "../../compare/Comparable";

export class OrderedListChannel<T> extends SimpleListChannel<T> {
    protected compare: Comparable<T>

    public constructor (compare: Comparable<T>, value: Array<T> = []) {
        super(value)
        this.compare = compare

        this.state.sort((a, b) => {
            return this.compare.compare(a, b)
        })
    }

    public dispatch (change: Change<T>): void {
        change = this.pipe.execute(change)
        if (change.inserted().length === 0 && change.removed().length === 0) {
            return
        }

        for (const toRemove of change.removed()) {
            const index: number = this.state.indexOf(toRemove)
            this.state.splice(index, 1)
        }

        for (const toInsert of change.inserted()) {
            const index: number = this.getInsertIndex(this.state, toInsert)
            if (index === -1) {
                this.state.push(toInsert)
            } else {
                this.state.splice(index, 0, toInsert)
            }
        }

        this.channel.dispatch(change)
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
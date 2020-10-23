import { QueryResult } from "./QueryResult"
import { Closable, EagerObservable, Dispatchable, Pipable } from "@wildebeest/observable"
import { ListChannel } from "../../list/structure/ListChannel"
import { Change } from "../../change/Change"
import { SimpleChange } from "../../change/SimpleChange"

export class PropertyQueryResult<T> implements QueryResult<T>, Dispatchable<Change<T>> {
    private eager: EagerObservable<T>
    private filterPipe: Pipable<Change<T>>
    private source: ListChannel<T>

    public constructor (source: ListChannel<T>, filters: Pipable<Change<T>>) {
        this.filterPipe = filters
        this.source = source
        this.eager = new EagerObservable()

        this.dispatch(new SimpleChange(this.source.get(), []))
        this.source.connect(this)
    }

    public connect (dispatcher: Dispatchable<T>): Closable {
        return this.eager.connect(dispatcher)
    }

    public connectFn (fn: (item: T) => void): Closable {
        return this.eager.connectFn(fn)
    }

    public disconnect (dispatcher: Dispatchable<T>): void {
        this.eager.disconnect(dispatcher)
    }

    public close (): void {
        this.source.disconnect(this)
    }

    public dispatch (change: Change<T>): void {
        change = this.filterPipe.execute(change)

        if (change.inserted().length === 0 && change.removed().length === 0) {
            return
        }

        let value: T = undefined
        if (change.inserted().length > 0) {
            value = change.inserted()[0]
        }

        this.eager.dispatch(value)
    }

    public get (): T {
        return this.eager.get()
    }

    public imidiate (): T {
        const value = this.get()
        this.close()
        return value
    }
}

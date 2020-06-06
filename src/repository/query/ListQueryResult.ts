import { QueryResult } from "./QueryResult"
import { Closable, EagerObservable, Dispatchable, Pipable } from "@wildebeest/observable"
import { ListChannel } from "../../list/structure/ListChannel"
import { Change } from "../../change/Change"
import { SimpleChange } from "../../change/SimpleChange"

export class ListQueryResult<T> implements QueryResult<Array<T>>, Dispatchable<Change<T>> {
    private eager: EagerObservable<Array<T>>
    private channel: ListChannel<T>
    private filterPipe: Pipable<Change<T>>
    private source: ListChannel<T>

    public constructor (source: ListChannel<T>, channel: ListChannel<T>, filters: Pipable<Change<T>>) {
        this.channel = channel
        this.filterPipe = filters
        this.source = source
        this.eager = new EagerObservable([])

        this.channel.connectFn(() => {
            this.eager.dispatch(this.channel.get())
        })

        this.dispatch(new SimpleChange(this.source.get(), []))
        this.source.connect(this)
    }

    public connect (dispatcher: Dispatchable<Array<T>>): Closable {
        return this.eager.connect(dispatcher)
    }

    public connectFn (fn: (item: Array<T>) => void): Closable {
        return this.eager.connectFn(fn)
    }

    public disconnect (dispatcher: Dispatchable<Array<T>>): void {
        this.eager.disconnect(dispatcher)
    }

    public close (): void {
        this.source.disconnect(this)
    }

    public dispatch (change: Change<T>): void {
        change = this.filterPipe.execute(change)
        this.channel.dispatch(change)
    }

    public get (): Array<T> {
        return this.eager.get()
    }
}

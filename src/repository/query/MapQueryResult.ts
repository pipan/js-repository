import { QueryResult } from "./QueryResult"
import { Closable, EagerObservable, Dispatchable, Pipable } from "@wildebeest/observable"
import { ListChannel } from "../../list/structure/ListChannel"
import { Change } from "../../change/Change"
import { SimpleChange } from "../../change/SimpleChange"
import { IdentifiableMapChannel } from "../../map/structure/IdentifiableMapChannel"

export class MapQueryResult<T, U> implements QueryResult<Map<T, U>>, Dispatchable<Change<U>> {
    private eager: EagerObservable<Map<T, U>>
    private channel: IdentifiableMapChannel<T, U>
    private filterPipe: Pipable<Change<U>>
    private source: ListChannel<U>

    public constructor (source: ListChannel<U>, channel: IdentifiableMapChannel<T, U>, filters: Pipable<Change<U>>) {
        this.channel = channel
        this.filterPipe = filters
        this.source = source
        this.eager = new EagerObservable(new Map())

        this.channel.connectFn(() => {
            this.eager.dispatch(this.channel.get())
        })

        this.dispatch(new SimpleChange(this.source.get(), []))
        this.source.connect(this)
    }

    public connect (dispatcher: Dispatchable<Map<T, U>>): Closable {
        return this.eager.connect(dispatcher)
    }

    public connectFn (fn: (item: Map<T, U>) => void): Closable {
        return this.eager.connectFn(fn)
    }

    public disconnect (dispatcher: Dispatchable<Map<T, U>>): void {
        this.eager.disconnect(dispatcher)
    }

    public close (): void {
        this.source.disconnect(this)
    }

    public dispatch (change: Change<U>): void {
        change = this.filterPipe.execute(change)
        this.channel.dispatch(change)
    }

    public get (): Map<T, U> {
        return this.eager.get()
    }

    public imidiate (): Map<T, U> {
        const value = this.get()
        this.close()
        return value
    }
}

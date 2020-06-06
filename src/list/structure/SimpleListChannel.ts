import { Channel, Closable, ProxyChannel, Dispatchable, Pipable, Pipe } from "@wildebeest/observable"
import { Change } from "../../change/Change"
import { FilterMissingRemoved } from "../filter/FilterMissingRemoved"

export class SimpleListChannel<T> implements Channel<Change<T>> {
    protected channel: Channel<Change<T>>
    protected state: Array<T>
    protected pipe: Pipable<Change<T>>

    public constructor (value: Array<T> = []) {
        this.state = value
        this.channel = new ProxyChannel()

        this.pipe = new Pipe([
            new FilterMissingRemoved(this.state)
        ])
    }

    public connect (dispatcher: Dispatchable<Change<T>>): Closable {
        return this.channel.connect(dispatcher)
    }

    public connectFn (fn: (value: Change<T>) => void): Closable {
        return this.channel.connectFn(fn)
    }

    public disconnect (dispatcher: Dispatchable<Change<T>>): void {
        this.channel.disconnect(dispatcher)
    }

    public dispatch (change: Change<T>): void {
        change = this.pipe.execute(change)
        if (change.inserted().length === 0 && change.removed().length === 0) {
            return
        }

        for (const remove of change.removed()) {
            const index: number = this.state.indexOf(remove)
            this.state.splice(index, 1)
        }

        for (const insert of change.inserted()) {
            this.state.push(insert)
        }

        this.channel.dispatch(change)
    }

    public get (): Array<T> {
        return this.state
    }
}

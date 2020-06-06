import { ChangeInput } from "./ChangeInput"
import { Change } from "../Change"
import { Channel, ProxyChannel, Dispatchable, Closable } from "@wildebeest/observable"
import { SimpleChange } from "../SimpleChange"

export class SimpleChangeInput<T> implements ChangeInput<T> {
    protected channel: Channel<Change<T>>

    public constructor () {
        this.channel = new ProxyChannel()
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

    public insert (items: Array<T>): void {
        this.change(items, [])
    }

    public remove (items: Array<T>): void {
        this.change([], items)
    }

    public change (insert: Array<T>, remove: Array<T>): void {
        this.channel.dispatch(new SimpleChange(insert, remove))
    }
}

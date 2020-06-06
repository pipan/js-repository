import { Channel, ProxyChannel, Closable, Dispatchable } from "@wildebeest/observable";
import { ObservableListOutput } from "./ObservableListOutput";
import { ListChange } from "../ListChange";

export class SimpleObservableListOutput<T> implements ObservableListOutput<T> {
    protected list: Array<T>
    protected channel: Channel<ListChange<T>>

    public constructor (values: Array<T> = []) {
        this.list = [...values]
        this.channel = new ProxyChannel()
    }

    public connect (dispatcher: Dispatchable<ListChange<T>>): Closable {
        return this.channel.connect(dispatcher)
    }

    public connectFn (fn: (item: ListChange<T>) => void): Closable {
        return this.channel.connectFn(fn)
    }

    public disconnect (dispatcher: Dispatchable<ListChange<T>>): void {
        this.channel.disconnect(dispatcher)
    }

    public dispatch (change: ListChange<T>): void {
        if (change.inserted().length === 0 && change.removed().length === 0) {
            return
        }
        this.list = [...change.source()]
        this.channel.dispatch(change)
    }

    public isEmpty (): boolean {
        return this.count() === 0
    }

    public get (index: number): T | undefined {
        if (this.count() <= index) {
            return undefined
        }
        return this.list[index]
    }

    public getAll (): Array<T> {
        return this.list
    }

    public count (): number {
        return this.list.length
    }

    public contains (item: T): boolean {
        return this.list.indexOf(item) > -1
    }
}

import { ObservableProperty } from "./ObservableProperty"
import { Channel, ProxyChannel, Dispatchable, Closable } from "@wildebeest/observable"
import { PropertyChange } from "../PropertyChange"

export class SimpleObservableProperty<T> implements ObservableProperty<T> {
    private channel: Channel<PropertyChange<T>>
    private value: T

    public constructor (value: T = undefined) {
        this.value = value
        this.channel = new ProxyChannel()
    }

    public connect (dispatcher: Dispatchable<PropertyChange<T>>): Closable {
        return this.channel.connect(dispatcher)
    }

    public connectFn (fn: (change: PropertyChange<T>) => void): Closable {
        return this.channel.connectFn(fn)
    }

    public disconnect (dispatcher: Dispatchable<PropertyChange<T>>): void {
        this.channel.disconnect(dispatcher)
    }

    public get (): T {
        return this.value
    }

    public isEmpty (): boolean {
        return this.value === undefined || this.value === null
    }

    public equals (value: T): boolean {
        return this.value === value
    }

    public set (value: T): void {
        if (this.equals(value)) {
            return
        }
        const prev: T = this.value
        this.value = value
        this.channel.dispatch(new PropertyChange(this.value, prev))
    }

    public clear (): void {
        this.set(undefined)
    }
}

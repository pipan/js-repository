import { ObservableMapOutput } from "./ObservableMapOutput"
import { Closable, Channel, Dispatchable, ProxyChannel } from "@wildebeest/observable"
import { MapChange } from "../MapChange"
import { MapEntry } from "../MapEntry"

export class SimpleMapOutput<T, U> implements ObservableMapOutput<T, U> {
    protected map: Map<T, U>
    protected list: Array<MapEntry<T, U>>
    protected channel: Channel<MapChange<T, U>>

    public constructor () {
        this.channel = new ProxyChannel()
        this.map = new Map()
        this.list = []
    }

    public connect (dispatcher: Dispatchable<MapChange<T, U>>): Closable {
        return this.channel.connect(dispatcher)
    }

    public connectFn (fn: (value: MapChange<T, U>) => void): Closable {
        return this.channel.connectFn(fn)
    }

    public disconnect (dispatcher: Dispatchable<MapChange<T, U>>): void {
        return this.channel.disconnect(dispatcher)
    }

    public getAll (): Array<MapEntry<T, U>> {
        return []
    }

    public get (key: T): U | undefined {
        return this.map.get(key)
    }

    public contains (key: T): boolean {
        return this.map.has(key)
    }

    public isEmpty (): boolean {
        return this.count() === 0
    }

    public count (): number {
        return this.map.size
    }

    public forEach (fn: (value: U, kee: T) => void): void {
        this.map.forEach(fn)
    }

    public dispatch (change: MapChange<T, U>): void {
        if (change.inserted().length === 0 && change.removed().length === 0) {
            return
        }
        this.map = new Map(change.source())
        this.list = []
        this.map.forEach((value: U, key: T) => {
            this.list.push(new MapEntry(key, value))
        })
        this.channel.dispatch(change)
    }
}

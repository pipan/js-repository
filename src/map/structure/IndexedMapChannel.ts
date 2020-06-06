import { Channel, Dispatchable, Closable, ProxyChannel, Adaptable } from "@wildebeest/observable"
import { Change } from "../../change/Change"
import { MapChannel } from "./MapChannel"
import { ChangeAdapter } from "../../change/ChangeAdapter"
import { FromMapEntryAdapter } from "../adapter/FromMapEntryAdaper"
import { ToMapEntryAdapter } from "../adapter/ToMapEntryAdapter"
import { MapEntry } from "../MapEntry"
import { SimpleMapChannel } from "./SimpleMapChannel"

export class IndexedMapChannel<T, U> implements Channel<Change<U>> {
    private mapChannel: MapChannel<T, U>
    private channel: Channel<Change<U>>
    private toEntryAdapter: Adaptable<Change<U>, Change<MapEntry<T, U>>>
    private fromEntryAdapter: Adaptable<Change<MapEntry<T, U>>, Change<U>>

    public constructor (adapter: Adaptable<U, T>) {
        this.toEntryAdapter = new ChangeAdapter(
            new ToMapEntryAdapter(adapter)
        )
        this.fromEntryAdapter = new ChangeAdapter(
            new FromMapEntryAdapter()
        )
        this.mapChannel = new SimpleMapChannel()
        this.channel = new ProxyChannel()

        this.mapChannel.connectFn((item: Change<MapEntry<T, U>>) => {
            this.channel.dispatch(
                this.fromEntryAdapter.adapt(item)
            )
        })
    }

    public connect (dispatcher: Dispatchable<Change<U>>): Closable {
        return this.channel.connect(dispatcher)
    }

    public connectFn (fn: (value: Change<U>) => void): Closable {
        return this.channel.connectFn(fn)
    }

    public disconnect (dispatcher: Dispatchable<Change<U>>): void {
        this.channel.disconnect(dispatcher)
    }

    public dispatch (change: Change<U>): void {
        this.mapChannel.dispatch(
            this.toEntryAdapter.adapt(change)
        )
    }

    public get (): Map<T, U> {
        return this.mapChannel.get()
    }
}
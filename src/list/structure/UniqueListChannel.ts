import { Change } from "../../change/Change"
import { SimpleListChannel } from "./SimpleListChannel"
import { MapChannel } from "../../map/structure/MapChannel"
import { MapEntry } from "../../map/MapEntry"
import { ChangeAdapter } from "../../change/ChangeAdapter"
import { ToMapEntryAdapter } from "../../map/adapter/ToMapEntryAdapter"
import { FromMapEntryAdapter } from "../../map/adapter/FromMapEntryAdaper"
import { SimpleMapChannel } from "../../map/structure/SimpleMapChannel"
import { ListChannel } from "./ListChannel"
import { Closable, Dispatchable, Adaptable } from "@wildebeest/observable"
import { SimpleChange } from "../../change/SimpleChange"

export class UniqueListChannel<T> implements ListChannel<T> {
    protected mapChannel: MapChannel<string, T>
    protected listChannel: ListChannel<T>
    protected toEntryAdapter: Adaptable<Change<T>, Change<MapEntry<string, T>>>
    protected fromEntryAdapter: Adaptable<Change<MapEntry<string, T>>, Change<T>>

    public constructor (adapter: Adaptable<T, string>, value: Array<T> = []) {
        this.listChannel = new SimpleListChannel()
        this.mapChannel = new SimpleMapChannel()
        this.toEntryAdapter = new ChangeAdapter(
            new ToMapEntryAdapter(adapter)
        )
        this.fromEntryAdapter = new ChangeAdapter(
            new FromMapEntryAdapter()
        )

        this.mapChannel.connectFn((change: Change<MapEntry<string, T>>) => {
            this.listChannel.dispatch(
                this.fromEntryAdapter.adapt(change)
            )
        })

        this.dispatch(new SimpleChange(value, []))
    }

    public connect (dispatcher: Dispatchable<Change<T>>): Closable {
        return this.listChannel.connect(dispatcher)
    }

    public connectFn (fn: (value: Change<T>) => void): Closable {
        return this.listChannel.connectFn(fn)
    }

    public disconnect (dispatcher: Dispatchable<Change<T>>): void {
        this.listChannel.disconnect(dispatcher)
    }

    public dispatch (change: Change<T>): void {
        this.mapChannel.dispatch(
            this.toEntryAdapter.adapt(change)
        )
    }

    public get (): Array<T> {
        return this.listChannel.get()
    }
}

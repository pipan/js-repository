import { Channel, ProxyChannel, Closable, Dispatchable, Pipable, Pipe } from "@wildebeest/observable";
import { Change } from "../../change/Change";
import { MapEntry } from "../MapEntry";
import { FilterMissingRemoved } from "../filter/FilterMissingRemoved";
import { FilterDuplicateInsert } from "../filter/FilterDuplicateInsert";
import { FilterDuplicateValue } from "../filter/FilterDuplicateValue";
import { CreateRemoveEventForReplace } from "../filter/CreateRemoveEventForReplace";
import { MapChannel } from "./MapChannel";
import { CorrectRemovedValue } from "../filter/CorrectRemovedValue";

export class SimpleMapChannel<T, U> implements MapChannel<T, U> {
    private channel: Channel<Change<MapEntry<T, U>>>
    private state: Map<T, U>
    private pipe: Pipable<Change<MapEntry<T, U>>>

    public constructor () {
        this.channel = new ProxyChannel()
        this.state = new Map()

        this.pipe = new Pipe([
            new FilterMissingRemoved(this.state),
            new CorrectRemovedValue(this.state),
            new FilterDuplicateInsert(),
            new FilterDuplicateValue(this.state),
            new CreateRemoveEventForReplace(this.state)
        ])
    }

    public connect (dispatcher: Dispatchable<Change<MapEntry<T, U>>>): Closable {
        return this.channel.connect(dispatcher)
    }

    public connectFn (fn: (value: Change<MapEntry<T, U>>) => void ): Closable {
        return this.channel.connectFn(fn)
    }

    public disconnect (dispatcher: Dispatchable<Change<MapEntry<T, U>>>): void {
        this.channel.disconnect(dispatcher)
    }

    public dispatch (change: Change<MapEntry<T, U>>): void {
        change = this.pipe.execute(change)
        if (change.inserted().length === 0 && change.removed().length === 0) {
            return
        }

        for (const toRemove of change.removed()) {
            this.state.delete(toRemove.getKey())
        }

        for (const toInsert of change.inserted()) {
            this.state.set(toInsert.getKey(), toInsert.getValue())
        }

        this.channel.dispatch(change)
    }

    public get(): Map<T, U> {
        return this.state
    }
}
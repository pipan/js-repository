import { Dispatchable, Closable, Adaptable } from "@wildebeest/observable";
import { Change } from "../../change/Change";
import { IdentifiableMapChannel } from "./IdentifiableMapChannel";
export declare class IndexedMapChannel<T, U> implements IdentifiableMapChannel<T, U> {
    private mapChannel;
    private channel;
    private toEntryAdapter;
    private fromEntryAdapter;
    constructor(adapter: Adaptable<U, T>);
    connect(dispatcher: Dispatchable<Change<U>>): Closable;
    connectFn(fn: (value: Change<U>) => void): Closable;
    disconnect(dispatcher: Dispatchable<Change<U>>): void;
    dispatch(change: Change<U>): void;
    get(): Map<T, U>;
}

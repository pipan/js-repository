import { ObservableMapOutput } from "./ObservableMapOutput";
import { Closable, Channel, Dispatchable } from "@wildebeest/observable";
import { MapChange } from "../MapChange";
import { MapEntry } from "../MapEntry";
export declare class SimpleMapOutput<T, U> implements ObservableMapOutput<T, U> {
    protected map: Map<T, U>;
    protected list: Array<MapEntry<T, U>>;
    protected channel: Channel<MapChange<T, U>>;
    constructor();
    connect(dispatcher: Dispatchable<MapChange<T, U>>): Closable;
    connectFn(fn: (value: MapChange<T, U>) => void): Closable;
    disconnect(dispatcher: Dispatchable<MapChange<T, U>>): void;
    getAll(): Array<MapEntry<T, U>>;
    get(key: T): U | undefined;
    contains(key: T): boolean;
    isEmpty(): boolean;
    count(): number;
    forEach(fn: (value: U, kee: T) => void): void;
    dispatch(change: MapChange<T, U>): void;
}

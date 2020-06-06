import { ObservableMap } from "./ObservableMap";
import { SimpleMapOutput } from "../output/SimpleMapOuput";
import { MapEntry } from "../MapEntry";
import { MapChange } from "../MapChange";
import { Dispatchable, Closable } from "@wildebeest/observable";
import { MapChannel } from "./MapChannel";
import { ChangeInput } from "../../change/input/ChangeInput";
export declare class SimpleObservableMap<T, U> implements ObservableMap<T, U> {
    protected mapChannel: MapChannel<T, U>;
    protected input: ChangeInput<MapEntry<T, U>>;
    protected output: SimpleMapOutput<T, U>;
    constructor();
    connect(dispatcher: Dispatchable<MapChange<T, U>>): Closable;
    connectFn(fn: (change: MapChange<T, U>) => void): Closable;
    disconnect(dispatcher: Dispatchable<MapChange<T, U>>): void;
    getAll(): Array<MapEntry<T, U>>;
    get(key: T): U | undefined;
    contains(key: T): boolean;
    isEmpty(): boolean;
    count(): number;
    forEach(fn: (value: U, key: T) => void): void;
    insert(key: T, value: U): void;
    remove(key: T): void;
    removeAll(keys: Array<T>): void;
    private removeAllEntries;
    clear(): void;
}

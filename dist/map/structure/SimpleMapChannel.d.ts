import { Closable, Dispatchable } from "@wildebeest/observable";
import { Change } from "../../change/Change";
import { MapEntry } from "../MapEntry";
import { MapChannel } from "./MapChannel";
export declare class SimpleMapChannel<T, U> implements MapChannel<T, U> {
    private channel;
    private state;
    private pipe;
    constructor();
    connect(dispatcher: Dispatchable<Change<MapEntry<T, U>>>): Closable;
    connectFn(fn: (value: Change<MapEntry<T, U>>) => void): Closable;
    disconnect(dispatcher: Dispatchable<Change<MapEntry<T, U>>>): void;
    dispatch(change: Change<MapEntry<T, U>>): void;
    get(): Map<T, U>;
}

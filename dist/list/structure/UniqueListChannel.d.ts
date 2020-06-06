import { Change } from "../../change/Change";
import { MapChannel } from "../../map/structure/MapChannel";
import { MapEntry } from "../../map/MapEntry";
import { ListChannel } from "./ListChannel";
import { Closable, Dispatchable, Adaptable } from "@wildebeest/observable";
export declare class UniqueListChannel<T> implements ListChannel<T> {
    protected mapChannel: MapChannel<string, T>;
    protected listChannel: ListChannel<T>;
    protected toEntryAdapter: Adaptable<Change<T>, Change<MapEntry<string, T>>>;
    protected fromEntryAdapter: Adaptable<Change<MapEntry<string, T>>, Change<T>>;
    constructor(adapter: Adaptable<T, string>, value?: Array<T>);
    connect(dispatcher: Dispatchable<Change<T>>): Closable;
    connectFn(fn: (value: Change<T>) => void): Closable;
    disconnect(dispatcher: Dispatchable<Change<T>>): void;
    dispatch(change: Change<T>): void;
    get(): Array<T>;
}

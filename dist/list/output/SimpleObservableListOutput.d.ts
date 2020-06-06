import { Channel, Closable, Dispatchable } from "@wildebeest/observable";
import { ObservableListOutput } from "./ObservableListOutput";
import { ListChange } from "../ListChange";
export declare class SimpleObservableListOutput<T> implements ObservableListOutput<T> {
    protected list: Array<T>;
    protected channel: Channel<ListChange<T>>;
    constructor(values?: Array<T>);
    connect(dispatcher: Dispatchable<ListChange<T>>): Closable;
    connectFn(fn: (item: ListChange<T>) => void): Closable;
    disconnect(dispatcher: Dispatchable<ListChange<T>>): void;
    dispatch(change: ListChange<T>): void;
    isEmpty(): boolean;
    get(index: number): T | undefined;
    getAll(): Array<T>;
    count(): number;
    contains(item: T): boolean;
}

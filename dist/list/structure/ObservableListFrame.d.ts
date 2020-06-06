import { Dispatchable, Closable } from "@wildebeest/observable";
import { SimpleObservableListOutput } from "../output/SimpleObservableListOutput";
import { ObservableList } from "./ObservableList";
import { ListChange } from "../ListChange";
import { ListChannel } from "./ListChannel";
import { ChangeInput } from "../../change/input/ChangeInput";
export declare class ObservableListFrame<T> implements ObservableList<T> {
    protected input: ChangeInput<T>;
    protected output: SimpleObservableListOutput<T>;
    protected listChannel: ListChannel<T>;
    constructor(listChannel: ListChannel<T>);
    connect(dispatcher: Dispatchable<ListChange<T>>): Closable;
    connectFn(fn: (change: ListChange<T>) => void): Closable;
    disconnect(dispatcher: Dispatchable<ListChange<T>>): void;
    getAll(): Array<T>;
    get(index: number): T | undefined;
    count(): number;
    isEmpty(): boolean;
    contains(item: T): boolean;
    insert(item: T): void;
    insertAll(items: Array<T>): void;
    remove(item: T): void;
    removeAll(items: Array<T>): void;
    setAll(items: Array<T>): void;
    clear(): void;
}

import { ObservableProperty } from "./ObservableProperty";
import { Dispatchable, Closable } from "@wildebeest/observable";
import { PropertyChange } from "../PropertyChange";
export declare class SimpleObservableProperty<T> implements ObservableProperty<T> {
    private channel;
    private value;
    constructor(value?: T);
    connect(dispatcher: Dispatchable<PropertyChange<T>>): Closable;
    connectFn(fn: (change: PropertyChange<T>) => void): Closable;
    disconnect(dispatcher: Dispatchable<PropertyChange<T>>): void;
    get(): T;
    isEmpty(): boolean;
    equals(value: T): boolean;
    set(value: T): void;
    clear(): void;
}

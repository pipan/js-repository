import { ChangeInput } from "./ChangeInput";
import { Change } from "../Change";
import { Channel, Dispatchable, Closable } from "@wildebeest/observable";
export declare class SimpleChangeInput<T> implements ChangeInput<T> {
    protected channel: Channel<Change<T>>;
    constructor();
    connect(dispatcher: Dispatchable<Change<T>>): Closable;
    connectFn(fn: (value: Change<T>) => void): Closable;
    disconnect(dispatcher: Dispatchable<Change<T>>): void;
    insert(items: Array<T>): void;
    remove(items: Array<T>): void;
    change(insert: Array<T>, remove: Array<T>): void;
}

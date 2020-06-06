import { Channel, Closable, Dispatchable, Pipable } from "@wildebeest/observable";
import { Change } from "../../change/Change";
export declare class SimpleListChannel<T> implements Channel<Change<T>> {
    protected channel: Channel<Change<T>>;
    protected state: Array<T>;
    protected pipe: Pipable<Change<T>>;
    constructor(value?: Array<T>);
    connect(dispatcher: Dispatchable<Change<T>>): Closable;
    connectFn(fn: (value: Change<T>) => void): Closable;
    disconnect(dispatcher: Dispatchable<Change<T>>): void;
    dispatch(change: Change<T>): void;
    get(): Array<T>;
}

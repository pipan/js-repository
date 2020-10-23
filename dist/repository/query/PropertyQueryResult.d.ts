import { QueryResult } from "./QueryResult";
import { Closable, Dispatchable, Pipable } from "@wildebeest/observable";
import { ListChannel } from "../../list/structure/ListChannel";
import { Change } from "../../change/Change";
export declare class PropertyQueryResult<T> implements QueryResult<T>, Dispatchable<Change<T>> {
    private eager;
    private filterPipe;
    private source;
    constructor(source: ListChannel<T>, filters: Pipable<Change<T>>);
    connect(dispatcher: Dispatchable<T>): Closable;
    connectFn(fn: (item: T) => void): Closable;
    disconnect(dispatcher: Dispatchable<T>): void;
    close(): void;
    dispatch(change: Change<T>): void;
    get(): T;
    imidiate(): T;
}

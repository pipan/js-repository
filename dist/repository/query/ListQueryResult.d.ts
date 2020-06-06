import { QueryResult } from "./QueryResult";
import { Closable, Dispatchable, Pipable } from "@wildebeest/observable";
import { ListChannel } from "../../list/structure/ListChannel";
import { Change } from "../../change/Change";
export declare class ListQueryResult<T> implements QueryResult<Array<T>>, Dispatchable<Change<T>> {
    private eager;
    private channel;
    private filterPipe;
    private source;
    constructor(source: ListChannel<T>, channel: ListChannel<T>, filters: Pipable<Change<T>>);
    connect(dispatcher: Dispatchable<Array<T>>): Closable;
    connectFn(fn: (item: Array<T>) => void): Closable;
    disconnect(dispatcher: Dispatchable<Array<T>>): void;
    close(): void;
    dispatch(change: Change<T>): void;
    get(): Array<T>;
}

import { QueryResult } from "./QueryResult";
import { Closable, Dispatchable, Pipable } from "@wildebeest/observable";
import { ListChannel } from "../../list/structure/ListChannel";
import { Change } from "../../change/Change";
import { IdentifiableMapChannel } from "../../map/structure/IdentifiableMapChannel";
export declare class MapQueryResult<T, U> implements QueryResult<Map<T, U>>, Dispatchable<Change<U>> {
    private eager;
    private channel;
    private filterPipe;
    private source;
    constructor(source: ListChannel<U>, channel: IdentifiableMapChannel<T, U>, filters: Pipable<Change<U>>);
    connect(dispatcher: Dispatchable<Map<T, U>>): Closable;
    connectFn(fn: (item: Map<T, U>) => void): Closable;
    disconnect(dispatcher: Dispatchable<Map<T, U>>): void;
    close(): void;
    dispatch(change: Change<U>): void;
    get(): Map<T, U>;
}

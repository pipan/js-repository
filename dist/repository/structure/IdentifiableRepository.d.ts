import { Identifiable } from "../../identify/Identifiable";
import { Repository } from "./Repository";
import { QueryBuilder } from "../query/QueryBuilder";
import { Closable, Dispatchable } from "@wildebeest/observable";
import { Change } from "../../change/Change";
export declare class IdentifiableRepository<T extends Identifiable> implements Repository<T> {
    private source;
    constructor();
    query(): QueryBuilder<T>;
    get(): Array<T>;
    connect(dispatcher: Dispatchable<Change<T>>): Closable;
    connectFn(fn: (item: Change<T>) => void): Closable;
    disconnect(dispatcher: Dispatchable<Change<T>>): void;
    insert(item: T): void;
    insertAll(items: Array<T>): void;
    remove(item: T): void;
    removeAll(items: Array<T>): void;
    setAll(items: Array<T>): void;
    clear(): void;
    change(insert: Array<T>, remove: Array<T>): void;
}

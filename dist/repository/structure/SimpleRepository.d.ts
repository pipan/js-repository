import { Identifiable } from "../../identify/Identifiable";
import { Repository } from "./Repository";
import { ListChannel } from "../../list/structure/ListChannel";
import { QueryBuilder } from "../query/QueryBuilder";
import { Closable, Dispatchable, Adaptable } from "@wildebeest/observable";
import { Change } from "../../change/Change";
export declare class SimpleRepository<T> implements Repository<T> {
    private source;
    private identityAdapter;
    constructor(source: ListChannel<T>, identityAdapter: Adaptable<any, string>);
    static createIdentifiable<T extends Identifiable>(): Repository<T>;
    static fromKeyProperty<T>(key: string): Repository<T>;
    static fromString<T>(): Repository<T>;
    static withIndex<T>(adapter: Adaptable<any, string>): Repository<T>;
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

import { Identifiable } from "../../identify/Identifiable";
import { Repository } from "./Repository";
import { QueryBuilder } from "../query/QueryBuilder";
export declare class SimpleRepository<T extends Identifiable> implements Repository<T> {
    private source;
    constructor();
    query(): QueryBuilder<T>;
    get(): Array<T>;
    insert(item: T): void;
    insertAll(items: Array<T>): void;
    remove(item: T): void;
    removeAll(items: Array<T>): void;
    setAll(items: Array<T>): void;
    clear(): void;
    change(insert: Array<T>, remove: Array<T>): void;
}

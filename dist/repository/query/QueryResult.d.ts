import { Connectable, Closable } from "@wildebeest/observable";
export interface QueryResult<T> extends Connectable<T>, Closable {
    get(): T;
}

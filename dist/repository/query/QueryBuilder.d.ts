import { QueryResult } from "./QueryResult";
import { ListChannel } from "../../list/structure/ListChannel";
import { Adaptable } from "@wildebeest/observable";
export declare class QueryBuilder<T> {
    private filters;
    private orderKey;
    private orderDirection;
    private indexName;
    private propertyIndexAdapter;
    private source;
    private operations;
    constructor(source: ListChannel<T>, propertyIndexAdapter: Adaptable<any, string>);
    filter(propertyName: string, operation: string, value: any): QueryBuilder<T>;
    orderBy(propertyName: string, direction?: string): QueryBuilder<T>;
    indexBy(propertyName: string): QueryBuilder<T>;
    list(): QueryResult<Array<T>>;
    property(identityValue: any): QueryResult<T>;
    map<U>(): QueryResult<Map<U, T>>;
}

import { QueryBuilder } from "../query/QueryBuilder";

export interface RepositoryOutput<T> {
    query (): QueryBuilder<T>;
    get (): Array<T>;
}

import { QueryBuilder } from "../query/QueryBuilder";
import { Connectable } from "@wildebeest/observable";
import { Change } from "../../change/Change";

export interface RepositoryOutput<T> extends Connectable<Change<T>> {
    query (): QueryBuilder<T>;
    get (): Array<T>;
}

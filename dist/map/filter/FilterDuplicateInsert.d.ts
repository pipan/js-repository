import { MapEntry } from "../MapEntry";
import { Change } from "../../change/Change";
import { Pipable } from "@wildebeest/observable";
export declare class FilterDuplicateInsert<T, U> implements Pipable<Change<MapEntry<T, U>>> {
    execute(change: Change<MapEntry<T, U>>): Change<MapEntry<T, U>>;
}

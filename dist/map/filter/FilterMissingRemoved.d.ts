import { MapEntry } from "../MapEntry";
import { Change } from "../../change/Change";
import { Pipable } from "@wildebeest/observable";
export declare class FilterMissingRemoved<T, U> implements Pipable<Change<MapEntry<T, U>>> {
    private map;
    constructor(map: Map<T, U>);
    execute(change: Change<MapEntry<T, U>>): Change<MapEntry<T, U>>;
}

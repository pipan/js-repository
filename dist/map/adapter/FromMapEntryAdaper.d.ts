import { MapEntry } from "../MapEntry";
import { Adaptable } from "@wildebeest/observable";
export declare class FromMapEntryAdapter<T, U> implements Adaptable<MapEntry<T, U>, U> {
    adapt(item: MapEntry<T, U>): U;
}

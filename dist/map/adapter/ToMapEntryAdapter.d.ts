import { MapEntry } from "../MapEntry";
import { Adaptable } from "@wildebeest/observable";
export declare class ToMapEntryAdapter<T, U> implements Adaptable<U, MapEntry<T, U>> {
    private adapter;
    constructor(adapter: Adaptable<U, T>);
    adapt(item: U): MapEntry<T, U>;
}

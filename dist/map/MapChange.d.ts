import { MapEntry } from "./MapEntry";
export declare class MapChange<T, U> {
    private insertedValue;
    private removedValue;
    private sourceValue;
    constructor(source: Map<T, U>, inserted: Array<MapEntry<T, U>>, removed: Array<MapEntry<T, U>>);
    inserted(): Array<MapEntry<T, U>>;
    removed(): Array<MapEntry<T, U>>;
    source(): Map<T, U>;
}

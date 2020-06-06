import { ListChannel } from "./list/structure/ListChannel";
import { Comparable } from "./compare/Comparable";
import { Adaptable } from "@wildebeest/observable";
import { MapChannel } from "./map/structure/MapChannel";
import { IdentifiableMapChannel } from "./map/structure/IdentifiableMapChannel";
export declare class Channels {
    static createList<T>(value?: Array<T>): ListChannel<T>;
    static createOrderedList<T>(compare: Comparable<T>, value?: Array<T>): ListChannel<T>;
    static createUniqueList<T>(adapter: Adaptable<T, string>, value?: Array<T>): ListChannel<T>;
    static createMap<T, U>(): MapChannel<T, U>;
    static createIndexedMap<T, U>(adapter: Adaptable<U, T>): IdentifiableMapChannel<T, U>;
}

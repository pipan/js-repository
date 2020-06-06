import { ObservableList } from "./list/structure/ObservableList";
import { Comparable } from "./compare/Comparable";
import { ObservableProperty } from "./property/structure/ObservableProperty";
import { ObservableMap } from "./map/structure/ObservableMap";
export declare class Observables {
    static createProperty<T>(value?: T): ObservableProperty<T>;
    static createList<T>(values?: Array<T>): ObservableList<T>;
    static createOrderedList<T>(compare: Comparable<T>, values?: Array<T>): ObservableList<T>;
    static createMap<T, U>(): ObservableMap<T, U>;
}

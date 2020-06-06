import { ObservableList } from "./list/structure/ObservableList"
import { ObservableListFrame } from "./list/structure/ObservableListFrame"
import { Comparable } from "./compare/Comparable"
import { ObservableProperty } from "./property/structure/ObservableProperty"
import { SimpleObservableProperty } from "./property/structure/SimpleObservableProperty"
import { ObservableMap } from "./map/structure/ObservableMap"
import { SimpleObservableMap } from "./map/structure/SimpleObservableMap"
import { OrderedListChannel } from "./list/structure/OrderedListChannel"
import { SimpleListChannel } from "./list/structure/SimpleListChannel"

export class Observables {
    public static createProperty<T> (value: T = undefined): ObservableProperty<T> {
        return new SimpleObservableProperty(value)
    }

    public static createList<T> (values: Array<T> = []): ObservableList<T> {
        return new ObservableListFrame(
            new SimpleListChannel(values)
        )
    }

    public static createOrderedList<T> (compare: Comparable<T>, values: Array<T> = []): ObservableList<T> {
        return new ObservableListFrame(
            new OrderedListChannel(compare, values)
        )
    }

    public static createMap<T, U> (): ObservableMap<T, U> {
        return new SimpleObservableMap()
    }
}
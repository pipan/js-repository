import { ListChannel } from "./list/structure/ListChannel"
import { SimpleListChannel } from "./list/structure/SimpleListChannel"
import { OrderedListChannel } from "./list/structure/OrderedListChannel"
import { Comparable } from "./compare/Comparable"
import { UniqueListChannel } from "./list/structure/UniqueListChannel"
import { SimpleMapChannel } from "./map/structure/SimpleMapChannel"
import { Adaptable } from "@wildebeest/observable"
import { MapChannel } from "./map/structure/MapChannel"
import { IdentifiableMapChannel } from "./map/structure/IdentifiableMapChannel"
import { IndexedMapChannel } from "./map/structure/IndexedMapChannel"

export class Channels {
    public static createList<T> (value: Array<T> = []): ListChannel<T> {
        return new SimpleListChannel(value)
    }

    public static createOrderedList<T> (compare: Comparable<T>, value: Array<T> = []): ListChannel<T> {
        return new OrderedListChannel(compare, value)
    }

    public static createUniqueList<T> (adapter: Adaptable<T, string>, value: Array<T> = []): ListChannel<T> {
        return new UniqueListChannel(adapter, value)
    }

    public static createMap<T, U> (): MapChannel<T, U>  {
        return new SimpleMapChannel()
    }

    public static createIndexedMap<T, U> (adapter: Adaptable<U, T>): IdentifiableMapChannel<T, U>  {
        return new IndexedMapChannel(adapter)
    }
}

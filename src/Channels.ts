import { ListChannel } from "./list/structure/ListChannel"
import { SimpleListChannel } from "./list/structure/SimpleListChannel"
import { OrderedListChannel } from "./list/structure/OrderedListChannel"
import { Comparable } from "./compare/Comparable"
import { UniqueListChannel } from "./list/structure/UniqueListChannel"
import { SimpleMapChannel } from "./map/structure/SimpleMapChannel"
import { Adaptable } from "@wildebeest/observable"

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

    public static createMap<T, U> (): SimpleMapChannel<T, U>  {
        return new SimpleMapChannel()
    }
}

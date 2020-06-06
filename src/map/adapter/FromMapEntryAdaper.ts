import { MapEntry } from "../MapEntry"
import { Adaptable } from "@wildebeest/observable"

export class FromMapEntryAdapter<T, U> implements Adaptable<MapEntry<T, U>, U> {
    public adapt (item: MapEntry<T, U>): U {
        return item.getValue()
    }
}

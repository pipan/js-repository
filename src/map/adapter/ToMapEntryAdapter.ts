import { MapEntry } from "../MapEntry"
import { Adaptable } from "@wildebeest/observable"

export class ToMapEntryAdapter<T, U> implements Adaptable<U, MapEntry<T, U>> {
    private adapter: Adaptable<U, T>

    public constructor (adapter: Adaptable<U, T>) {
        this.adapter = adapter
    }

    public adapt (item: U): MapEntry<T, U> {
        return new MapEntry(this.adapter.adapt(item), item)
    }
}

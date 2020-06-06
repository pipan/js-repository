import { MapEntry } from "./MapEntry";

export class MapChange<T, U> {
    private insertedValue: Array<MapEntry<T, U>>
    private removedValue: Array<MapEntry<T, U>>
    private sourceValue: Map<T, U>

    public constructor (source: Map<T, U>, inserted: Array<MapEntry<T, U>>, removed: Array<MapEntry<T, U>>) {
        this.sourceValue = source
        this.insertedValue = inserted
        this.removedValue = removed

    }

    public inserted (): Array<MapEntry<T, U>> {
        return this.insertedValue
    }

    public removed (): Array<MapEntry<T, U>> {
        return this.removedValue
    }

    public source (): Map<T, U> {
        return this.sourceValue
    }
}

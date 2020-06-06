import { Connectable } from "@wildebeest/observable";
import { MapChange } from "../MapChange";
import { MapEntry } from "../MapEntry";
export interface ObservableMapOutput<T, U> extends Connectable<MapChange<T, U>> {
    get(key: T): U | undefined;
    getAll(): Array<MapEntry<T, U>>;
    contains(ket: T): boolean;
    isEmpty(): boolean;
    count(): number;
    forEach(fn: (value: U, key: T) => void): void;
}

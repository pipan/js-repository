import { Connectable } from "@wildebeest/observable";
import { PropertyChange } from "../PropertyChange";
export interface ObservablePropertyOutput<T> extends Connectable<PropertyChange<T>> {
    get(): T | undefined;
    isEmpty(): boolean;
    equals(value: T): boolean;
}

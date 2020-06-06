import { Connectable } from "@wildebeest/observable";
import { Change } from "../Change";
export interface ChangeInput<T> extends Connectable<Change<T>> {
    insert(items: Array<T>): void;
    remove(items: Array<T>): void;
    change(insert: Array<T>, remove: Array<T>): void;
}

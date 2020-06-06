import { Connectable } from "@wildebeest/observable";
import { ListChange } from "../ListChange";

export interface ObservableListOutput<T> extends Connectable<ListChange<T>> {
    isEmpty (): boolean;
    get (index: number): T | undefined;
    getAll (): Array<T>;
    count (): number;
    contains (item: T): boolean;
}
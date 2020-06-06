import { ListChange } from "../ListChange";
import { Pipable } from "@wildebeest/observable";
export declare class ListUniqueFilter<T> implements Pipable<ListChange<T>> {
    execute(change: ListChange<T>): ListChange<T>;
}

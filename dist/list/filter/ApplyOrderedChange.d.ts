import { ListChange } from "../ListChange";
import { Comparable } from "../../compare/Comparable";
import { Pipable } from "@wildebeest/observable";
export declare class ApplyOrderedChange<T> implements Pipable<ListChange<T>> {
    protected compare: Comparable<T>;
    constructor(compare: Comparable<T>);
    execute(change: ListChange<T>): ListChange<T>;
    private getInsertIndex;
}

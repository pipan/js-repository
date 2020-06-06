import { Change } from "../../change/Change";
import { Pipable } from "@wildebeest/observable";
export declare class FilterMissingRemoved<T> implements Pipable<Change<T>> {
    private list;
    constructor(list: Array<T>);
    execute(change: Change<T>): Change<T>;
}

import { SimpleListChannel } from "./SimpleListChannel";
import { Change } from "../../change/Change";
import { Comparable } from "../../compare/Comparable";
export declare class OrderedListChannel<T> extends SimpleListChannel<T> {
    protected compare: Comparable<T>;
    constructor(compare: Comparable<T>, value?: Array<T>);
    dispatch(change: Change<T>): void;
    private getInsertIndex;
}

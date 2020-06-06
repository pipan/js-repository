import { Comparable } from "./Comparable";
export declare class InverseComparable<T> implements Comparable<T> {
    private comparable;
    constructor(comparable: Comparable<T>);
    compare(a: T, b: T): number;
}

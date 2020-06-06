import { Comparable } from "./Comparable";
export declare class ComparableFn<T> implements Comparable<T> {
    protected fn: (a: T, b: T) => number;
    constructor(fn: (a: T, b: T) => number);
    compare(a: T, b: T): number;
}

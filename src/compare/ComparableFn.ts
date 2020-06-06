import { Comparable } from "./Comparable"

export class ComparableFn<T> implements Comparable<T> {
    protected fn: (a: T, b: T) => number

    public constructor (fn: (a: T, b: T) => number) {
        this.fn = fn
    }

    public compare (a: T, b: T): number {
        return this.fn(a, b)
    }
}

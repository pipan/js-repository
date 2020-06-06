import { Comparable } from "./Comparable"

export class InverseComparable<T> implements Comparable<T> {
    private comparable: Comparable<T>

    public constructor (comparable: Comparable<T>) {
        this.comparable = comparable
    }

    public compare (a: T, b: T): number {
        return this.comparable.compare(a, b) * -1
    }
}

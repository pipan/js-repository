export class PropertyChange<T> {
    private nextValue: T
    private previousValue: T

    public constructor (nextValue: T, previousValue: T) {
        this.nextValue = nextValue
        this.previousValue = previousValue
    }

    public next(): T {
        return this.nextValue
    }

    public previous(): T {
        return this.previousValue
    }
}
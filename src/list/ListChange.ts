export class ListChange<T> {
    protected removedArray: Array<T>
    protected insertedArray: Array<T>
    protected sourceValue: Array<T>

    public constructor (sourceValue: Array<T>, insertedArray: Array<T>, removedArray: Array<T>) {
        this.removedArray = removedArray
        this.insertedArray = insertedArray
        this.sourceValue = sourceValue
    }

    public removed(): Array<T> {
        return this.removedArray
    }

    public inserted(): Array<T> {
        return this.insertedArray
    }

    public source(): Array<T> {
        return this.sourceValue
    }
}

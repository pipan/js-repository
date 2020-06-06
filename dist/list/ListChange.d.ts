export declare class ListChange<T> {
    protected removedArray: Array<T>;
    protected insertedArray: Array<T>;
    protected sourceValue: Array<T>;
    constructor(sourceValue: Array<T>, insertedArray: Array<T>, removedArray: Array<T>);
    removed(): Array<T>;
    inserted(): Array<T>;
    source(): Array<T>;
}

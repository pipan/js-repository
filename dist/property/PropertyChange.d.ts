export declare class PropertyChange<T> {
    private nextValue;
    private previousValue;
    constructor(nextValue: T, previousValue: T);
    next(): T;
    previous(): T;
}

import { Change } from "./Change";
export declare class SimpleChange<T> implements Change<T> {
    protected ins: Array<T>;
    protected rem: Array<T>;
    constructor(inserted: Array<T>, removed: Array<T>);
    inserted(): Array<T>;
    removed(): Array<T>;
}

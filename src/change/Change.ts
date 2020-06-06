export interface Change<T> {
    inserted(): Array<T>;
    removed(): Array<T>;
}

export interface MapInput<T, U> {
    insert(key: T, value: U): void;
    remove(key: T): void;
    removeAll(keys: Array<T>): void;
    clear(): void;
}

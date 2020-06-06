export interface RepositoryInput<T> {
    insert (item: T): void;
    insertAll (items: Array<T>): void;
    setAll (items: Array<T>): void;
    remove (item: T): void;
    removeAll (items: Array<T>): void;
    change (insert: Array<T>, remove: Array<T>): void
    clear (): void;
}

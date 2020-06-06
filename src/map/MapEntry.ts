export class MapEntry<T, U> {
    private key: T
    private value: U

    public constructor (key: T, value: U) {
        this.key = key
        this.value = value
    }

    public getKey (): T {
        return this.key
    }

    public getValue (): U {
        return this.value
    }
}

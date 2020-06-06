import { Change } from "./Change"

export class SimpleChange<T> implements Change<T> {
    protected ins: Array<T>
    protected rem: Array<T>

    public constructor (inserted: Array<T>, removed: Array<T>) {
        this.ins = inserted
        this.rem = removed
    }

    public inserted (): Array<T> {
        return this.ins
    }

    public removed (): Array<T> {
        return this.rem
    }
}

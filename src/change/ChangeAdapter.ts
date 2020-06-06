import { Change } from "./Change"
import { SimpleChange } from "./SimpleChange"
import { Adaptable } from "@wildebeest/observable"

export class ChangeAdapter<T, U> implements Adaptable<Change<T>, Change<U>> {
    private adapter: Adaptable<T, U>

    public constructor (adapter: Adaptable<T, U>) {
        this.adapter = adapter
    }

    public adapt (item: Change<T>): Change<U> {
        const toRemove: Array<U> = []
        for (const remove of item.removed()) {
            toRemove.push(this.adapter.adapt(remove))
        }

        const toInsert: Array<U> = []
        for (const insert of item.inserted()) {
            toInsert.push(this.adapter.adapt(insert))
        }

        return new SimpleChange(toInsert, toRemove)
    }
}

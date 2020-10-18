import { Change } from "../../change/Change"
import { SimpleChange } from "../../change/SimpleChange"
import { ObjectPropertyAdapter } from "../adapter/ObjectPropertyAdapter"
import { Adaptable, Pipable } from "@wildebeest/observable"

export class AdapterEqualsFilter implements Pipable<Change<any>> {
    private adapter: Adaptable<any, any>
    private value: any

    public constructor (adapter: Adaptable<any, string>, value: any) {
        this.adapter = adapter
        this.value = value
    }

    public static fromPropertyName (key: string, value: any): Pipable<Change<any>> {
        return new AdapterEqualsFilter(new ObjectPropertyAdapter(key), value)
    }
    
    public execute (value: Change<any>): Change<any> {
        const toRemove: Array<any> = []
        for (const removed of value.removed()) {
            if (this.adapter.adapt(removed) !== this.value) {
                continue
            }
            toRemove.push(removed)
        }

        const toInsert: Array<any> = []
        for (const inserted of value.inserted()) {
            if (this.adapter.adapt(inserted) !== this.value) {
                continue
            }
            toInsert.push(inserted)
        }

        return new SimpleChange(toInsert, toRemove)
    }
}

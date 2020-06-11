import { Comparable } from "./Comparable"
import { ObjectPropertyAdapter } from "../repository/adapter/ObjectPropertyAdapter"
import { Adaptable } from "@wildebeest/observable"

export class PropertyComparable implements Comparable<any> {
    private propertyAdapter: Adaptable<any, any>

    public constructor (propertyName: string) {
        this.propertyAdapter = new ObjectPropertyAdapter(propertyName)
    }

    public compare (a: any, b: any): number {
        const aValue = this.propertyAdapter.adapt(a)
        const bValue = this.propertyAdapter.adapt(b)
        if (aValue < bValue) {
            return -1
        } else if (aValue > bValue) {
            return 1
        }
        return 0
    }
}

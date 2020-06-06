import { Comparable } from "./compare/Comparable"
import { ComparableFn } from "./compare/ComparableFn"
import { PropertyComparable } from "./compare/PropertyComparable"
import { InverseComparable } from "./compare/InverseComparable"

export class Comparables {
    public static stringAsc (): Comparable<string> {
        return new ComparableFn((a: string, b: string) => {
            return a.localeCompare(b)
        })
    }

    public static stringDesc (): Comparable<string> {
        return new ComparableFn((a: string, b: string) => {
            return a.localeCompare(b) * -1
        })
    }

    public static property<T> (propertyName: string, direction: string): Comparable<T> {
        if (direction == 'asc') {
            return this.propertyAsc(propertyName)
        } else {
            return this.propertyDesc(propertyName)
        }
    }

    public static propertyAsc<T> (propertyName: string): Comparable<T> {
        return new PropertyComparable(propertyName)
    }

    public static propertyDesc<T> (propertyName: string): Comparable<T> {
        return new InverseComparable(
            this.propertyAsc(propertyName)
        )
    }
}

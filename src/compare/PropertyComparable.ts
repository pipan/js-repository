import { Comparable } from "./Comparable"

export class PropertyComparable implements Comparable<any> {
    private propertyName: string

    public constructor (propertyName: string) {
        this.propertyName = propertyName
    }

    public compare (a: any, b: any): number {
        if (a[this.propertyName] < b[this.propertyName]) {
            return -1
        } else if (a[this.propertyName] > b[this.propertyName]) {
            return 1
        }
        return 0
    }
}

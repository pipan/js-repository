import { Adaptable } from "@wildebeest/observable"

export class ObjectPropertyAdapter implements Adaptable<any, any> {
    private propertyName: string

    public constructor (propertyName: string) {
        this.propertyName = propertyName
    }

    public adapt (item: any): any {
        if (typeof item[this.propertyName] === 'function') {
            return item[this.propertyName]()
        }
        return item[this.propertyName]
    }
}

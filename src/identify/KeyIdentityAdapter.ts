import { Adaptable } from "@wildebeest/observable"

export class KeyIdentityAdapter implements Adaptable<any, string> {
    private key: string

    constructor (key: string) {
        this.key = key
    }

    public adapt (item: any): string {
        return item[this.key]
    }
}

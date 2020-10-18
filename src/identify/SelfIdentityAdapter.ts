import { Adaptable } from "@wildebeest/observable"

export class SlefIdentityAdapter implements Adaptable<any, string> {
    public adapt (item: any): string {
        return item
    }
}

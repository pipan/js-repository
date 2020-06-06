import { Identifiable } from "./Identifiable"
import { Adaptable } from "@wildebeest/observable"

export class IdentityAdapter<T extends Identifiable> implements Adaptable<T, string> {
    public adapt (item: T): string {
        return item.identify()
    }
}

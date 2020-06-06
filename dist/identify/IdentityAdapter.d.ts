import { Identifiable } from "./Identifiable";
import { Adaptable } from "@wildebeest/observable";
export declare class IdentityAdapter<T extends Identifiable> implements Adaptable<T, string> {
    adapt(item: T): string;
}

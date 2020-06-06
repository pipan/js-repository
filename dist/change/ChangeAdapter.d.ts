import { Change } from "./Change";
import { Adaptable } from "@wildebeest/observable";
export declare class ChangeAdapter<T, U> implements Adaptable<Change<T>, Change<U>> {
    private adapter;
    constructor(adapter: Adaptable<T, U>);
    adapt(item: Change<T>): Change<U>;
}

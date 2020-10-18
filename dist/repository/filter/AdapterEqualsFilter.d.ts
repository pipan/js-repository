import { Change } from "../../change/Change";
import { Adaptable, Pipable } from "@wildebeest/observable";
export declare class AdapterEqualsFilter implements Pipable<Change<any>> {
    private adapter;
    private value;
    constructor(adapter: Adaptable<any, string>, value: any);
    static fromPropertyName(key: string, value: any): Pipable<Change<any>>;
    execute(value: Change<any>): Change<any>;
}

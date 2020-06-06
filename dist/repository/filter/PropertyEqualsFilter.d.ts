import { Change } from "../../change/Change";
import { Pipable } from "@wildebeest/observable";
export declare class PropertyEqualsFilter implements Pipable<Change<any>> {
    private adapter;
    private value;
    constructor(key: string, value: any);
    execute(value: Change<any>): Change<any>;
}

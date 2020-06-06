import { Adaptable } from "@wildebeest/observable";
export declare class ObjectPropertyAdapter implements Adaptable<any, any> {
    private propertyName;
    constructor(propertyName: string);
    adapt(item: any): any;
}

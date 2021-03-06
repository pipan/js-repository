import { Comparable } from "./Comparable";
export declare class PropertyComparable implements Comparable<any> {
    private propertyAdapter;
    constructor(propertyName: string);
    compare(a: any, b: any): number;
}

import { Comparable } from "./compare/Comparable";
export declare class Comparables {
    static stringAsc(): Comparable<string>;
    static stringDesc(): Comparable<string>;
    static property<T>(propertyName: string, direction: string): Comparable<T>;
    static propertyAsc<T>(propertyName: string): Comparable<T>;
    static propertyDesc<T>(propertyName: string): Comparable<T>;
}

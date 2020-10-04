import { Adaptable } from "@wildebeest/observable";
export declare class KeyIdentityAdapter implements Adaptable<any, string> {
    private key;
    constructor(key: string);
    adapt(item: any): string;
}

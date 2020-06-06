import 'ts-jest';
import { ObservableProperty, PropertyChange, Observables } from '../../../src';
import { Closable } from '@wildebeest/observable';

test("connect fn change to different value will trigger dispatch", () => {
    let property: ObservableProperty<string> = Observables.createProperty();

    let called: boolean = false;
    property.connectFn((change: PropertyChange<string>) => {
        expect(change.next()).toBe("hallo");
        expect(change.previous()).toBeUndefined();
        called = true;
    });
    property.set("hallo")

    expect(called).toBeTruthy();
});

test("connect does not fire when setting same value", () => {
    let property: ObservableProperty<string> = Observables.createProperty("test");

    let called: boolean = false;
    property.connectFn((change) => {
        called = true;
    });

    property.set("test");
    expect(called).toBeFalsy();
});

test("disconnect removes listener and change is not called", () => {
    let property: ObservableProperty<string> = Observables.createProperty()

    let called: boolean = false
    let closable: Closable = property.connectFn((change) => {
        called = true;
    });
    closable.close()

    property.set("test")
    expect(called).toBeFalsy()
});
import 'ts-jest';
import { ObservableMap, MapChange, Observables } from '../../../src';

test("add not existing key fires event", () => {
    const map: ObservableMap<string, string> = Observables.createMap();

    let called: boolean = false;
    map.connectFn((change: MapChange<string, string>) => {
        expect(change.inserted().length).toBe(1);
        expect(change.removed().length).toBe(0);
        expect(change.inserted()[0].getKey()).toBe("test");
        expect(change.inserted()[0].getValue()).toBe("value");
        called = true;
    });

    map.insert("test", "value");
    expect(called).toBeTruthy();
});

test("add existing key new value fires event", () => {
    const map: ObservableMap<string, string> = Observables.createMap();
    map.insert('test', 'a')

    let called: boolean = false;
    map.connectFn((change: MapChange<string, string>) => {
        called = true;
        expect(change.inserted().length).toBe(1);
        expect(change.removed().length).toBe(1);
        expect(change.inserted()[0].getKey()).toBe("test");
        expect(change.inserted()[0].getValue()).toBe("value");
        expect(change.removed()[0].getKey()).toBe("test");
        expect(change.removed()[0].getValue()).toBe("a");
    });

    map.insert("test", "value");
    expect(called).toBeTruthy();
});

test("add existing key and value does not fire event", () => {
    const map: ObservableMap<string, string> = Observables.createMap();
    map.insert('test', 'value')

    let called: boolean = false;
    map.connectFn((change: MapChange<string, string>) => {
        called = true;
    });

    map.insert("test", "value");

    expect(called).toBeFalsy();
});

test("add existing key and object value fires event", () => {
    const map: ObservableMap<string, any> = Observables.createMap();
    map.insert('test', { name: 'name' })

    let called: boolean = false;
    map.connectFn((change: MapChange<string, string>) => {
        called = true;
    });

    map.insert("test", { name: "name" });

    expect(called).toBeTruthy();
});

test("add existing key and multi level object value fires event", () => {
    const map: ObservableMap<string, any> = Observables.createMap();
    map.insert('test', { name: 'name', list: [] })

    let called: boolean = false;
    map.connectFn((change: MapChange<string, string>) => {
        called = true;
    });

    map.insert("test", { name: "name", list: [] });

    expect(called).toBeTruthy();
});

test("remove key exists fires event with removed", () => {
    const map: ObservableMap<string, string> = Observables.createMap();
    map.insert('test', 'value')

    let called: boolean = false;
    map.connectFn((change: MapChange<string, string>) => {
        called = true;
        expect(change.inserted().length).toBe(0);
        expect(change.removed().length).toBe(1);
        expect(change.removed()[0].getKey()).toBe("test");
        expect(change.removed()[0].getValue()).toBe("value");
    })

    map.remove("test");
    expect(called).toBeTruthy();
});

test("remove key non existing does not fire event", () => {
    const map: ObservableMap<string, string> = Observables.createMap();
    map.insert('test', 'value')

    let called: boolean = false;
    map.connectFn((change: MapChange<string, string>) => {
        called = true;
    });

    map.remove("other");

    expect(called).toBeFalsy();
});

test("remove key exists fires event with removed", () => {
    const map: ObservableMap<string, string> = Observables.createMap();
    map.insert('test', 'value')
    map.insert('two', 'a')

    let called: boolean = false;
    map.connectFn((change: MapChange<string, string>) => {
        called = true;
        expect(change.inserted().length).toBe(0);
        expect(change.removed().length).toBe(2);
        expect(change.removed()[0].getKey()).toBe("test");
        expect(change.removed()[0].getValue()).toBe("value");
        expect(change.removed()[1].getKey()).toBe("two");
        expect(change.removed()[1].getValue()).toBe("a");
    })

    map.removeAll(["test", "two"]);
    expect(called).toBeTruthy();
});

test("removeAll key non existing does not fire event", () => {
    const map: ObservableMap<string, string> = Observables.createMap();
    map.insert('test', 'value')

    let called: boolean = false;
    map.connectFn((change: MapChange<string, string>) => {
        called = true;
    });

    map.removeAll(["other"]);

    expect(called).toBeFalsy();
});

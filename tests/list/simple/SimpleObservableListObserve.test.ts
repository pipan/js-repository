import 'ts-jest'
import { ListChange, ObservableList, Observables } from '../../../src'

test("add new item fires change event", () => {
    let list: ObservableList<string> = Observables.createList();

    let called: boolean = false
    list.connectFn((change: ListChange<string>) => {
        const list: Array<string> = change.source()
        expect(list.length).toBe(1)
        expect(list[0]).toBe("test")
        called = true
    })

    list.insert("test")
    expect(called).toBeTruthy()
});

test("add existing fires change event", () => {
    let list: ObservableList<string> = Observables.createList(['test']);

    let called: boolean = false;
    list.connectFn((change: ListChange<string>) => {
        called = true;
    })

    list.insert("test");
    expect(called).toBeTruthy();
});

test("addAll new item fires change event", () => {
    let list: ObservableList<string> = Observables.createList();

    let called: boolean = false;
    list.connectFn((change: ListChange<string>) => {
        expect(change.source().length).toBe(2);
        called = true;
    })

    list.insertAll(["test", "2"]);
    expect(called).toBeTruthy();
});

test("addAll existing items fires change event", () => {
    let list: ObservableList<string> = Observables.createList(['2', 'test']);

    let called: boolean = false;
    list.connectFn((change: ListChange<string>) => {
        called = true;
    })

    list.insertAll(["test", "2"]);
    expect(called).toBeTruthy();
});

test("addAll empty array will not dispatch change event", () => {
    let list: ObservableList<string> = Observables.createList();

    let called: boolean = false;
    list.connectFn((change: ListChange<string>) => {
        called = true;
    })

    list.insertAll([]);
    expect(called).toBeFalsy();
});

test("remove existing item fires change event", () => {
    let list: ObservableList<string> = Observables.createList(['test']);

    let called: boolean = false;
    list.connectFn((change: ListChange<string>) => {
        expect(change.removed().length).toBe(1)
        called = true;
    })

    list.remove('test');
    expect(called).toBeTruthy();
});

test("remove missing item will not fire change event", () => {
    let list: ObservableList<string> = Observables.createList(['test']);

    let called: boolean = false;
    list.connectFn((change: ListChange<string>) => {
        called = true;
    })

    list.remove('missing');
    expect(called).toBeFalsy();
});

test("removeAll empty array will not fire change event", () => {
    let list: ObservableList<string> = Observables.createList(['test']);

    let called: boolean = false;
    list.connectFn((change: ListChange<string>) => {
        called = true;
    })

    list.removeAll([]);
    expect(called).toBeFalsy();
});

test("removeAll all missing will not fire change event", () => {
    let list: ObservableList<string> = Observables.createList(['test']);

    let called: boolean = false;
    list.connectFn((change: ListChange<string>) => {
        called = true;
    })

    list.removeAll(['1', '2']);
    expect(called).toBeFalsy();
});

test("clear filled will fire event", () => {
    let list: ObservableList<string> = Observables.createList(['test']);

    let called: boolean = false;
    list.connectFn((change: ListChange<string>) => {
        expect(change.removed().length).toEqual(1)
        called = true;
    })

    list.clear()
    expect(called).toBeTruthy();
});

test("clear empty list will not fire event", () => {
    let list: ObservableList<string> = Observables.createList();

    let called: boolean = false;
    list.connectFn((change: ListChange<string>) => {
        called = true;
    })

    list.clear()
    expect(called).toBeFalsy();
});
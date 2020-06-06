import 'ts-jest'
import { ObservableList, Observables } from '../../../src';

test("insert new item inserts item to the end", () => {
    let list: ObservableList<string> = Observables.createList();
    list.insert("test");

    expect(list.count()).toBe(1);
    expect(list.get(0)).toBe("test");
});

test("add existing item adds item", () => {
    let list: ObservableList<string> = Observables.createList(['test']);
    list.insert("test");

    expect(list.count()).toBe(2);
    expect(list.get(0)).toBe("test");
    expect(list.get(1)).toBe("test");
});

test("addAll new items inserts items to the end", () => {
    let list: ObservableList<string> = Observables.createList();
    list.insertAll(["test", "2"]);

    expect(list.count()).toBe(2);
    expect(list.get(0)).toBe("test");
    expect(list.get(1)).toBe("2");
});

test("addAll one new item one existing inserts both at the end", () => {
    let list: ObservableList<string> = Observables.createList(['test']);
    list.insertAll(["test", "2"]);

    expect(list.count()).toBe(3);
    expect(list.get(0)).toBe("test");
    expect(list.get(1)).toBe("test");
    expect(list.get(2)).toBe("2");
});

test("addAll existing items adds all items", () => {
    let list: ObservableList<string> = Observables.createList(['2', 'test']);
    list.insertAll(["test", "2"]);

    expect(list.count()).toBe(4);
    expect(list.get(0)).toBe("2");
    expect(list.get(1)).toBe("test");
    expect(list.get(2)).toBe("test");
    expect(list.get(3)).toBe("2");
});

// test("setAll two new items inserts two new items", () => {
//     let list: ObservableList<string> = Observables.createList(['2', 'test']);
//     list.setAll(["test", "one"]);

//     expect(list.count()).toBe(2);
//     expect(list.get(0)).toBe("test");
//     expect(list.get(1)).toBe("one");
// });

// test("setAll two new items fires change with two new items", () => {
//     let list: ObservableList<string> = Observables.createList();

//     let called: boolean = false;
//     list.addListener((change: ListChange<string>) => {
//         expect(change.inserted().length).toBe(2);
//         expect(change.removed().length).toBe(0);
//         called = true;
//     });

//     list.setAll(["test", "one"]);
//     expect(called).toBeTruthy();
// });

// test("setAll one new item one existing result is ordered by setAll array", () => {
//     let list: ObservableList<string> = Observables.createList(["one", "two"]);
//     list.setAll(["test", "one"]);

//     expect(list.count()).toBe(2);
//     expect(list.get(0)).toBe("test");
//     expect(list.get(1)).toBe("one");
// });

// test("setAll one new item one existing fires change with one insert one remove", () => {
//     let list: ObservableList<string> = Observables.createList(["one", "two"]);

//     let called: boolean = false;
//     list.addListener((change: ListChange<string>) => {
//         expect(change.inserted().length).toBe(1);
//         expect(change.removed().length).toBe(1);
//         called = true;
//     });

//     list.setAll(["test", "one"]);
//     expect(called).toBeTruthy();
// });

// test("setAll two new item two different exists result is ordered by setAll array", () => {
//     let list: ObservableList<string> = Observables.createList(["one", "two"]);
//     list.setAll(["test", "ing"]);

//     expect(list.count()).toBe(2);
//     expect(list.get(0)).toBe("test");
//     expect(list.get(1)).toBe("ing");
// });

// test("setAll two new items fires change with two inserts two removes", () => {
//     let list: ObservableList<string> = Observables.createList(["one", "two"]);

//     let called: boolean = false;
//     list.addListener((change: ListChange<string>) => {
//         expect(change.inserted().length).toBe(2);
//         expect(change.removed().length).toBe(2);
//         called = true;
//     });

//     list.setAll(["test", "ing"]);
//     expect(called).toBeTruthy();
// });

// test("setAll empty array removes original array", () => {
//     let list: ObservableList<string> = Observables.createList(["one", "two"]);

//     list.setAll([]);

//     expect(list.count()).toBe(0);
// });

// test("setAll empty array removes original array", () => {
//     let list: ObservableList<string> = Observables.createList(["one", "two"]);

//     let called: boolean = false;
//     list.addListener((change: ListChange<string>) => {
//         expect(change.inserted().length).toBe(0);
//         expect(change.removed().length).toBe(2);
//         called = true;
//     });

//     list.setAll([]);
//     expect(called).toBeTruthy();
// });

// test("setAll empty array when contains empty array does not fire event", () => {
//     let list: ObservableList<string> = Observables.createList([]);

//     let called: boolean = false;
//     list.addListener((change: ListChange<string>) => {
//         called = true;
//     });

//     list.setAll([]);
//     expect(called).toBeFalsy();
// });

// test("setAll array with values in different order does not fire event", () => {
//     let list: ObservableList<string> = Observables.createList(["one", "two", "three"]);

//     let called: boolean = false;
//     list.addListener((change: ListChange<string>) => {
//         called = true;
//     });

//     list.setAll(["two", "three", "one"]);
//     expect(called).toBeFalsy();
// });

// // remove
// test("remove existing item containing one item", () => {
//     let list: ObservableList<string> = Observables.createList(["test"]);
//     list.remove("test");

//     expect(list.count()).toBe(0);
// });

// test("remove existing item containig more items", () => {
//     let list: ObservableList<string> = Observables.createList(["test", "more"]);
//     list.remove("test");

//     expect(list.count()).toBe(1);
//     expect(list.get(0)).toBe("more");
// });

// test("remove item fires change event", () => {
//     let list: ObservableList<string> = Observables.createList(["test"]);

//     let called: boolean = false;
//     list.addListener((change: ListChange<string>) => {
//         expect(change.inserted().length).toBe(0);
//         expect(change.removed().length).toBe(1);
//         called = true;
//     })

//     list.remove("test");
//     expect(called).toBeTruthy();
// });

// test("remove non existing item", () => {
//     let list: ObservableList<string> = Observables.createList(["test"]);
//     list.remove("aaaa");

//     expect(list.count()).toBe(1);
//     expect(list.get(0)).toBe("test");
// });

// test("remove non existing item does not fire change event", () => {
//     let list: ObservableList<string> = Observables.createList(["test"]);

//     let called: boolean = false;
//     list.addListener((change: ListChange<string>) => {
//         called = true;
//     })

//     list.remove("aaaa");
//     expect(called).toBeFalsy();
// });

// // removeAll
// test("removeAll items removes two items", () => {
//     let list: ObservableList<string> = Observables.createList(["test", "one"]);

//     list.removeAll(["test", "one"]);

//     expect(list.count()).toBe(0);
// });

// test("removeAll items removes two items in different order", () => {
//     let list: ObservableList<string> = Observables.createList(["one", "test", "three"]);

//     list.removeAll(["test", "one"]);

//     expect(list.count()).toBe(1);
//     expect(list.get(0)).toBe("three");
// });

// test("removeAll items fires remove event with two removed", () => {
//     let list: ObservableList<string> = Observables.createList(["one", "test", "three"]);

//     let called: boolean = false;
//     list.addListener((change: ListChange<string>) => {
//         expect(change.inserted().length).toBe(0);
//         expect(change.removed().length).toBe(2);
//         called = true;
//     });

//     list.removeAll(["test", "one"]);
//     expect(called).toBeTruthy();
// });

// test("removeAll one item exists one does not exists removes one item", () => {
//     let list: ObservableList<string> = Observables.createList(["one", "test", "three"]);

//     list.removeAll(["test", "four"]);

//     expect(list.count()).toBe(2);
//     expect(list.get(0)).toBe("one");
//     expect(list.get(1)).toBe("three");
// });

// test("removeAll one item exists one does not exists fires change event with one removed", () => {
//     let list: ObservableList<string> = Observables.createList(["one", "test", "three"]);

//     let called: boolean = false;
//     list.addListener((change: ListChange<string>) => {
//         expect(change.inserted().length).toBe(0);
//         expect(change.removed().length).toBe(1);
//         called = true;
//     });

//     list.removeAll(["test", "four"]);
//     expect(called).toBeTruthy();
// });

// test("removeAll all items not exists", () => {
//     let list: ObservableList<string> = Observables.createList(["one", "test", "three"]);

//     list.removeAll(["bb", "aa"]);

//     expect(list.count()).toBe(3);
//     expect(list.get(0)).toBe("one");
//     expect(list.get(1)).toBe("test");
//     expect(list.get(2)).toBe("three");
// });

// test("removeAll all items not exists", () => {
//     let list: ObservableList<string> = Observables.createList(["one", "test", "three"]);

//     let called: boolean = false;
//     list.addListener((change: ListChange<string>) => {
//         called = true;
//     });

//     expect(called).toBeFalsy();
// });

// // clear
// test("clear containig items empties array", () => {
//     let list: ObservableList<string> = Observables.createList(["one", "test", "three"]);

//     list.clear();

//     expect(list.count()).toBe(0);
// });

// test("clear containig items fires change with three removed", () => {
//     let list: ObservableList<string> = Observables.createList(["one", "test", "three"]);

//     let called: boolean = false;
//     list.addListener((change: ListChange<string>) => {
//         expect(change.removed().length).toBe(3);
//         expect(change.inserted().length).toBe(0);
//         called = true;
//     });

//     list.clear();
//     expect(called).toBeTruthy();
// });

// test("clear not containig items keep empty array", () => {
//     let list: ObservableList<string> = Observables.createList();

//     list.clear();

//     expect(list.count()).toBe(0);
// });

// test("clear not containig items does not fire change", () => {
//     let list: ObservableList<string> = Observables.createList();

//     let called: boolean = false;
//     list.addListener((change: ListChange<string>) => {
//         called = true;
//     });

//     list.clear();

//     expect(called).toBeFalsy();
// });
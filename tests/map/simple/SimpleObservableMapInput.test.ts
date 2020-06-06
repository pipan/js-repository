import 'ts-jest'
import { ObservableMap, Observables } from '../../../src'

const map: ObservableMap<string, string> = Observables.createMap()


test("add not existing key set new value", () => {
    const map: ObservableMap<string, string> = Observables.createMap()

    map.insert("test", "value")

    expect(map.count()).toBe(1)
    expect(map.get("test")).toBe("value")
})

test("add existing key new value set new value", () => {
    const map: ObservableMap<string, string> = Observables.createMap()
    map.insert('test', 'a')

    map.insert("test", "value")

    expect(map.count()).toBe(1)
    expect(map.get("test")).toBe("value")
})

test("add existing key and value nothing changes", () => {
    const map: ObservableMap<string, string> = Observables.createMap()
    map.insert("test", "value")

    map.insert("test", "value")

    expect(map.count()).toBe(1)
    expect(map.get("test")).toBe("value")
})

test("remove key exists remove value", () => {
    const map: ObservableMap<string, string> = Observables.createMap()
    map.insert("test", "value")

    map.remove("test")

    expect(map.count()).toBe(0)
})

test("remove key non existing does nothing", () => {
    const map: ObservableMap<string, string> = Observables.createMap()
    map.insert("test", "value")

    map.remove("other")

    expect(map.count()).toBe(1)
})

test("removeAll key exists remove value", () => {
    const map: ObservableMap<string, string> = Observables.createMap()
    map.insert("test", "value")
    map.insert("two", "a")

    map.removeAll(["test", "two"])

    expect(map.count()).toBe(0)
})

test("removeAll key non existing does nothing", () => {
    const map: ObservableMap<string, string> = Observables.createMap()
    map.insert("test", "value")

    map.removeAll(["other"])

    expect(map.count()).toBe(1)
})

// test("addAll to empty map fires event", () => {
//     let map: ObservableMap<string, string> = new SimpleObservableMap()

//     let called: boolean = false
//     map.addListener((change: MapChange<string, string>) => {
//         called = true
//         expect(change.inserted().length).toBe(2)
//         expect(change.removed().length).toBe(0)
//         expect(change.inserted()[0].getKey()).toBe("test")
//         expect(change.inserted()[0].getValue()).toBe("testValue")
//         expect(change.inserted()[1].getKey()).toBe("duo")
//         expect(change.inserted()[1].getValue()).toBe("abcd")
//     })

//     let addMap: Map<string, string> = new Map()
//     addMap.set("test", "testValue")
//     addMap.set("duo", "abcd")
//     map.addAll(addMap)
//     expect(called).toBeTruthy()
// })

// test("addAll existing key new value set new value", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "a")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let addMap: Map<string, string> = new Map()
//     addMap.set("test", "testValue")
//     map.addAll(addMap)

//     expect(map.count()).toBe(1)
//     expect(map.get("test")).toBe("testValue")
// })

// test("addAll existing key new value fires event", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "a")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let called: boolean = false
//     map.addListener((change: MapChange<string, string>) => {
//         called = true
//         expect(change.inserted().length).toBe(1)
//         expect(change.removed().length).toBe(1)
//         expect(change.inserted()[0].getKey()).toBe("test")
//         expect(change.inserted()[0].getValue()).toBe("testValue")
//         expect(change.removed()[0].getKey()).toBe("test")
//         expect(change.removed()[0].getValue()).toBe("a")
//     })

//     let addMap: Map<string, string> = new Map()
//     addMap.set("test", "testValue")
//     map.addAll(addMap)
//     expect(called).toBeTruthy()
// })

// test("addAll existing key and value nothing changes", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "value")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let addMap: Map<string, string> = new Map()
//     addMap.set("test", "value")
//     map.addAll(addMap)

//     expect(map.count()).toBe(1)
//     expect(map.get("test")).toBe("value")
// })

// test("addAll existing key and value does not fire event", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "value")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let called: boolean = false
//     map.addListener((change: MapChange<string, string>) => {
//         called = true
//     })

//     let addMap: Map<string, string> = new Map()
//     addMap.set("test", "value")
//     map.addAll(addMap)

//     expect(called).toBeFalsy()
// })

// // addList

// test("addList to empty map set new values", () => {
//     let map: ObservableMap<string, string> = new SimpleObservableMap()

//     let addList: MapEntry<string, string>[] = []
//     addList.push(new MapEntry("test", "testValue"))
//     addList.push(new MapEntry("duo", "abcd"))
//     map.addList(addList)

//     expect(map.count()).toBe(2)
//     expect(map.get("test")).toBe("testValue")
//     expect(map.get("duo")).toBe("abcd")
// })

// test("addList to empty map fires event", () => {
//     let map: ObservableMap<string, string> = new SimpleObservableMap()

//     let called: boolean = false
//     map.addListener((change: MapChange<string, string>) => {
//         called = true
//         expect(change.inserted().length).toBe(2)
//         expect(change.removed().length).toBe(0)
//         expect(change.inserted()[0].getKey()).toBe("test")
//         expect(change.inserted()[0].getValue()).toBe("testValue")
//         expect(change.inserted()[1].getKey()).toBe("duo")
//         expect(change.inserted()[1].getValue()).toBe("abcd")
//     })

//     let addList: MapEntry<string, string>[] = []
//     addList.push(new MapEntry("test", "testValue"))
//     addList.push(new MapEntry("duo", "abcd"))
//     map.addList(addList)
//     expect(called).toBeTruthy()
// })

// test("addList existing key new value set new value", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "a")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let addList: MapEntry<string, string>[] = []
//     addList.push(new MapEntry("test", "testValue"))
//     map.addList(addList)

//     expect(map.count()).toBe(1)
//     expect(map.get("test")).toBe("testValue")
// })

// test("addList existing key new value fires event", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "a")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let called: boolean = false
//     map.addListener((change: MapChange<string, string>) => {
//         called = true
//         expect(change.inserted().length).toBe(1)
//         expect(change.removed().length).toBe(1)
//         expect(change.inserted()[0].getKey()).toBe("test")
//         expect(change.inserted()[0].getValue()).toBe("testValue")
//         expect(change.removed()[0].getKey()).toBe("test")
//         expect(change.removed()[0].getValue()).toBe("a")
//     })

//     let addList: MapEntry<string, string>[] = []
//     addList.push(new MapEntry("test", "testValue"))
//     map.addList(addList)
//     expect(called).toBeTruthy()
// })

// test("addList existing key and value nothing changes", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "value")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let addList: MapEntry<string, string>[] = []
//     addList.push(new MapEntry("test", "value"))
//     map.addList(addList)

//     expect(map.count()).toBe(1)
//     expect(map.get("test")).toBe("value")
// })

// test("addList existing key and value does not fire event", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "value")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let called: boolean = false
//     map.addListener((change: MapChange<string, string>) => {
//         called = true
//     })

//     let addList: MapEntry<string, string>[] = []
//     addList.push(new MapEntry("test", "value"))
//     map.addList(addList)

//     expect(called).toBeFalsy()
// })

// // setAll

// test("setAll to empty map set new values", () => {
//     let map: ObservableMap<string, string> = new SimpleObservableMap()

//     let addMap: Map<string, string> = new Map()
//     addMap.set("test", "testValue")
//     addMap.set("duo", "abcd")
//     map.setAll(addMap)

//     expect(map.count()).toBe(2)
//     expect(map.get("test")).toBe("testValue")
//     expect(map.get("duo")).toBe("abcd")
// })

// test("setAll to empty map fires event", () => {
//     let map: ObservableMap<string, string> = new SimpleObservableMap()

//     let called: boolean = false
//     map.addListener((change: MapChange<string, string>) => {
//         called = true
//         expect(change.inserted().length).toBe(2)
//         expect(change.removed().length).toBe(0)
//         expect(change.inserted()[0].getKey()).toBe("test")
//         expect(change.inserted()[0].getValue()).toBe("testValue")
//         expect(change.inserted()[1].getKey()).toBe("duo")
//         expect(change.inserted()[1].getValue()).toBe("abcd")
//     })

//     let addMap: Map<string, string> = new Map()
//     addMap.set("test", "testValue")
//     addMap.set("duo", "abcd")
//     map.setAll(addMap)
//     expect(called).toBeTruthy()
// })

// test("setAll existing key new value set new value", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "a")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let addMap: Map<string, string> = new Map()
//     addMap.set("test", "testValue")
//     map.setAll(addMap)

//     expect(map.count()).toBe(1)
//     expect(map.get("test")).toBe("testValue")
// })

// test("setAll existing key new value fires event", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "a")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let called: boolean = false
//     map.addListener((change: MapChange<string, string>) => {
//         called = true
//         expect(change.inserted().length).toBe(1)
//         expect(change.removed().length).toBe(1)
//         expect(change.inserted()[0].getKey()).toBe("test")
//         expect(change.inserted()[0].getValue()).toBe("testValue")
//         expect(change.removed()[0].getKey()).toBe("test")
//         expect(change.removed()[0].getValue()).toBe("a")
//     })

//     let addMap: Map<string, string> = new Map()
//     addMap.set("test", "testValue")
//     map.setAll(addMap)
//     expect(called).toBeTruthy()
// })

// test("setAll existing key and value nothing changes", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "value")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let addMap: Map<string, string> = new Map()
//     addMap.set("test", "value")
//     map.setAll(addMap)

//     expect(map.count()).toBe(1)
//     expect(map.get("test")).toBe("value")
// })

// test("setAll existing key and value does not fire event", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "value")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let called: boolean = false
//     map.addListener((change: MapChange<string, string>) => {
//         called = true
//     })

//     let addMap: Map<string, string> = new Map()
//     addMap.set("test", "value")
//     map.setAll(addMap)

//     expect(called).toBeFalsy()
// })

// test("setAll no common key removes that are not present in new map", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "a")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let addMap: Map<string, string> = new Map()
//     addMap.set("other", "testValue")
//     map.setAll(addMap)

//     expect(map.count()).toBe(1)
//     expect(map.get("other")).toBe("testValue")
// })

// test("setAll no common key fires event with removed and inserted", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "a")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let called: boolean = false
//     map.addListener((change: MapChange<string, string>) => {
//         called = true
//         expect(change.inserted().length).toBe(1)
//         expect(change.removed().length).toBe(1)
//         expect(change.inserted()[0].getKey()).toBe("other")
//         expect(change.inserted()[0].getValue()).toBe("testValue")
//         expect(change.removed()[0].getKey()).toBe("test")
//         expect(change.removed()[0].getValue()).toBe("a")
//     })

//     let addMap: Map<string, string> = new Map()
//     addMap.set("other", "testValue")
//     map.setAll(addMap)
//     expect(called).toBeTruthy()
// })

// // setList

// test("setList to empty map set new values", () => {
//     let map: ObservableMap<string, string> = new SimpleObservableMap()

//     let list: MapEntry<string, string>[] = []
//     list.push(new MapEntry("test", "testValue"))
//     list.push(new MapEntry("duo", "abcd"))
//     map.setList(list)

//     expect(map.count()).toBe(2)
//     expect(map.get("test")).toBe("testValue")
//     expect(map.get("duo")).toBe("abcd")
// })

// test("setList to empty map fires event", () => {
//     let map: ObservableMap<string, string> = new SimpleObservableMap()

//     let called: boolean = false
//     map.addListener((change: MapChange<string, string>) => {
//         called = true
//         expect(change.inserted().length).toBe(2)
//         expect(change.removed().length).toBe(0)
//         expect(change.inserted()[0].getKey()).toBe("test")
//         expect(change.inserted()[0].getValue()).toBe("testValue")
//         expect(change.inserted()[1].getKey()).toBe("duo")
//         expect(change.inserted()[1].getValue()).toBe("abcd")
//     })

//     let list: MapEntry<string, string>[] = []
//     list.push(new MapEntry("test", "testValue"))
//     list.push(new MapEntry("duo", "abcd"))
//     map.setList(list)
//     expect(called).toBeTruthy()
// })

// test("setList existing key new value set new value", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "a")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let list: MapEntry<string, string>[] = []
//     list.push(new MapEntry("test", "testValue"))
//     map.setList(list)

//     expect(map.count()).toBe(1)
//     expect(map.get("test")).toBe("testValue")
// })

// test("setList existing key new value fires event", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "a")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let called: boolean = false
//     map.addListener((change: MapChange<string, string>) => {
//         called = true
//         expect(change.inserted().length).toBe(1)
//         expect(change.removed().length).toBe(1)
//         expect(change.inserted()[0].getKey()).toBe("test")
//         expect(change.inserted()[0].getValue()).toBe("testValue")
//         expect(change.removed()[0].getKey()).toBe("test")
//         expect(change.removed()[0].getValue()).toBe("a")
//     })

//     let list: MapEntry<string, string>[] = []
//     list.push(new MapEntry("test", "testValue"))
//     map.setList(list)
//     expect(called).toBeTruthy()
// })

// test("setList existing key and value nothing changes", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "value")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let list: MapEntry<string, string>[] = []
//     list.push(new MapEntry("test", "value"))
//     map.setList(list)

//     expect(map.count()).toBe(1)
//     expect(map.get("test")).toBe("value")
// })

// test("setList existing key and value does not fire event", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "value")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let called: boolean = false
//     map.addListener((change: MapChange<string, string>) => {
//         called = true
//     })

//     let list: MapEntry<string, string>[] = []
//     list.push(new MapEntry("test", "value"))
//     map.setList(list)

//     expect(called).toBeFalsy()
// })

// test("setList no common key removes that are not present in new map", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "a")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let list: MapEntry<string, string>[] = []
//     list.push(new MapEntry("other", "testValue"))
//     map.setList(list)

//     expect(map.count()).toBe(1)
//     expect(map.get("other")).toBe("testValue")
// })

// test("setList no common key fires event with removed and inserted", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "a")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let called: boolean = false
//     map.addListener((change: MapChange<string, string>) => {
//         called = true
//         expect(change.inserted().length).toBe(1)
//         expect(change.removed().length).toBe(1)
//         expect(change.inserted()[0].getKey()).toBe("other")
//         expect(change.inserted()[0].getValue()).toBe("testValue")
//         expect(change.removed()[0].getKey()).toBe("test")
//         expect(change.removed()[0].getValue()).toBe("a")
//     })

//     let list: MapEntry<string, string>[] = []
//     list.push(new MapEntry("other", "testValue"))
//     map.setList(list)
//     expect(called).toBeTruthy()
// })

// // clear

// test("clear containig items empties map", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "value")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     map.clear()

//     expect(map.count()).toBe(0)
// })

// test("clear containig items fires change with three removed", () => {
//     let initMap: Map<string, string> = new Map()
//     initMap.set("test", "value")
//     let map: ObservableMap<string, string> = new SimpleObservableMap(initMap)

//     let called: boolean = false
//     map.addListener((change: MapChange<string, string>) => {
//         called = true
//         expect(change.removed().length).toBe(1)
//         expect(change.inserted().length).toBe(0)
//     })

//     map.clear()
//     expect(called).toBeTruthy()
// })

// test("clear not containig items keep empty array", () => {
//     let map: ObservableMap<string, string> = new SimpleObservableMap()

//     map.clear()

//     expect(map.count()).toBe(0)
// })

// test("clear not containig items does not fire change", () => {
//     let map: ObservableMap<string, string> = new SimpleObservableMap()

//     let called: boolean = false
//     map.addListener((change: MapChange<string, string>) => {
//         called = true
//     })

//     map.clear()

//     expect(called).toBeFalsy()
// })
import 'ts-jest'
import { ObservableMap, Observables } from '../../../src'

test("get contains key returns value", () => {
    const map: ObservableMap<string, string> = Observables.createMap()
    map.insert('one', 'value-1')

    expect(map.get("one")).toBe("value-1")
})

test("get does not contains key returns null", () => {
    const map: ObservableMap<string, string> = Observables.createMap()
    map.insert('one', 'value-1')

    expect(map.get("three")).toBeUndefined()
})

test("isEmpty returns true after empty construct", () => {
    const map: ObservableMap<string, string> = Observables.createMap()

    expect(map.isEmpty()).toBeTruthy()
})

test("isEmpty returns false if map contains item", () => {
    const map: ObservableMap<string, string> = Observables.createMap()
    map.insert('test', 'value')

    expect(map.isEmpty()).toBeFalsy()
})

test("isEmpty returns true after remove all eleents", () => {
    const map: ObservableMap<string, string> = Observables.createMap()
    map.insert('test', 'value')

    map.remove("test")

    expect(map.isEmpty()).toBeTruthy()
})

test("count is zero after empty construct", () => {
    const map: ObservableMap<string, string> = Observables.createMap()

    expect(map.count()).toBe(0)
})

test("count is one after inserting one item", () => {
    const map: ObservableMap<string, string> = Observables.createMap()
    map.insert('test', 'value')

    expect(map.count()).toBe(1)
})

test("count decrease by one after removing an item", () => {
    const map: ObservableMap<string, string> = Observables.createMap()
    map.insert('test', 'value')
    map.remove("test")

    expect(map.count()).toBe(0)
})

test("count stays the same after adding item with existing key", () => {
    const map: ObservableMap<string, string> = Observables.createMap()
    map.insert('test', 'value')
    map.insert("test", "a")

    expect(map.count()).toBe(1)
})

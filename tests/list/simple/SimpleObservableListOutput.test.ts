import 'ts-jest'
import { ObservableList, Observables } from '../../../src'

test("all returns empty array on construct", () => {
    let list: ObservableList<string> = Observables.createList()

    expect(list.getAll()).toStrictEqual([])
})

test("all returns array with values", () => {
    let list: ObservableList<string> = Observables.createList(['test'])

    expect(list.getAll()).toStrictEqual(["test"])
})

test("get returns item, item exists", () => {
    let list: ObservableList<string> = Observables.createList(['test'])

    expect(list.get(0)).toStrictEqual("test")
})

test("get throws exception, item does not exists", () => {
    let list: ObservableList<string> = Observables.createList(['test'])

    expect(list.get(1)).toBeUndefined()
})


test("isEmpty containing empty array returns true", () => {
    let list: ObservableList<string> = Observables.createList()

    expect(list.isEmpty()).toBeTruthy()
})

test("isEmpty containing array with items returns false", () => {
    let list: ObservableList<string> = Observables.createList(['test'])

    expect(list.isEmpty()).toBeFalsy()
})

test("count containing empty array returns zero", () => {
    let list: ObservableList<string> = Observables.createList()

    expect(list.count()).toBe(0)
})

test("count containing array with items returns one", () => {
    let list: ObservableList<string> = Observables.createList(['test'])

    expect(list.count()).toBe(1)
})
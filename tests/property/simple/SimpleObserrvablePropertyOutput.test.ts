import 'ts-jest'
import { ObservableProperty, Observables } from '../../../src'

test("get return null after construction", () => {
    let property: ObservableProperty<string> = Observables.createProperty()

    expect(property.get()).toBeUndefined()
})

test("get returns value that was set in constructor", () => {
    let property: ObservableProperty<string> = Observables.createProperty("test")

    expect(property.get()).toBe("test")
})

test("isEmpty is true when constructor empty", () => {
    let property: ObservableProperty<string> = Observables.createProperty()

    expect(property.isEmpty()).toBeTruthy()
})

test("isEmpty is true when value is null", () => {
    let property: ObservableProperty<string> = Observables.createProperty(null)

    expect(property.isEmpty()).toBeTruthy()
})

test("isEmpty is true when value is undefined", () => {
    let property: ObservableProperty<string> = Observables.createProperty(undefined)

    expect(property.isEmpty()).toBeTruthy()
})

test("isEmpty is false when value is string", () => {
    let property: ObservableProperty<string> = Observables.createProperty("string")

    expect(property.isEmpty()).toBeFalsy()
})

test("isEmpty is false when value is empty string", () => {
    let property: ObservableProperty<string> = Observables.createProperty("")

    expect(property.isEmpty()).toBeFalsy()
})

test("isEmpty is false when value is empty array", () => {
    let property: ObservableProperty<string[]> = Observables.createProperty([])

    expect(property.isEmpty()).toBeFalsy()
})

test("isEmpty is false when value is false", () => {
    let property: ObservableProperty<boolean> = Observables.createProperty(false)

    expect(property.isEmpty()).toBeFalsy()
})

test("isEmpty is false when value is zero", () => {
    let property: ObservableProperty<number> = Observables.createProperty(0)

    expect(property.isEmpty()).toBeFalsy()
})
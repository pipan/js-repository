import 'ts-jest'
import { ObservableProperty, Observables } from '../../../src'

test("set different value", () => {
    let property: ObservableProperty<string> = Observables.createProperty()
    property.set("test")

    expect(property.get()).toBe("test")
})

test("set null will set value to null", () => {
    let property: ObservableProperty<string> = Observables.createProperty("test")
    property.set(null)

    expect(property.get()).toBeNull()
})

test("set undefined will set value to undefined", () => {
    let property: ObservableProperty<string> = Observables.createProperty("test")
    property.set(undefined)

    expect(property.get()).toBeUndefined()
})

test("clear will set value to undefined", () => {
    let property: ObservableProperty<string> = Observables.createProperty("test")
    property.clear()

    expect(property.get()).toBeUndefined()
})

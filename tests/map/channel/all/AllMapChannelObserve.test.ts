import 'ts-jest'
import { Channels, MapChannel, MapEntry, SimpleChange, Change } from '../../../../src'

const instances: any = [
    [() => { return Channels.createMap() }]
]

test.each(instances)("(%#) empty channel - dispatch empty change - does not trigger change", (channeLFactory) => {
    const channel: MapChannel<string, string> = channeLFactory()

    let called = false
    channel.connectFn((change: Change<MapEntry<string, string>>) => {
        called = true
    })

    channel.dispatch(new SimpleChange([], []))

    expect(called).toBeFalsy()
})

test.each(instances)("(%#) empty channel - dispatch insert - triggers change callback", (channeLFactory) => {
    const channel: MapChannel<string, string> = channeLFactory()

    let called = false
    channel.connectFn((change: Change<MapEntry<string, string>>) => {
        expect(change.inserted().length).toEqual(1)
        expect(change.removed().length).toEqual(0)
        called = true
    })

    channel.dispatch(new SimpleChange([new MapEntry('key', 'value')], []))

    expect(called).toBeTruthy()
})

test.each(instances)("(%#) filled channel - dispatch insert same key - triggers change callback", (channeLFactory) => {
    const channel: MapChannel<string, string> = channeLFactory()

    channel.dispatch(new SimpleChange([new MapEntry('key', 'value')], []))

    let called = false
    channel.connectFn((change: Change<MapEntry<string, string>>) => {
        expect(change.inserted().length).toEqual(1)
        expect(change.removed().length).toEqual(1)
        called = true
    })

    channel.dispatch(new SimpleChange([new MapEntry('key', 'newValue')], []))

    expect(called).toBeTruthy()
})

test.each(instances)("(%#) filled channel - dispatch insert same key same value - does not triggers change callback", (channeLFactory) => {
    const channel: MapChannel<string, string> = channeLFactory()

    channel.dispatch(new SimpleChange([new MapEntry('key', 'value')], []))

    let called = false
    channel.connectFn((change: Change<MapEntry<string, string>>) => {
        called = true
    })

    channel.dispatch(new SimpleChange([new MapEntry('key', 'value')], []))

    expect(called).toBeFalsy()
})

test.each(instances)("(%#) filled channel - dispatch remove existing key - triggers change callback", (channeLFactory) => {
    const channel: MapChannel<string, string> = channeLFactory()

    channel.dispatch(new SimpleChange([new MapEntry('key', 'value')], []))

    let called = false
    channel.connectFn((change: Change<MapEntry<string, string>>) => {
        expect(change.inserted().length).toEqual(0)
        expect(change.removed().length).toEqual(1)
        called = true
    })

    channel.dispatch(new SimpleChange([], [new MapEntry('key', 'value')]))

    expect(called).toBeTruthy()
})

test.each(instances)("(%#) filled channel - dispatch remove non-existing key - does not triggers change callback", (channeLFactory) => {
    const channel: MapChannel<string, string> = channeLFactory()

    channel.dispatch(new SimpleChange([new MapEntry('key', 'value')], []))

    let called = false
    channel.connectFn((change: Change<MapEntry<string, string>>) => {
        called = true
    })

    channel.dispatch(new SimpleChange([], [new MapEntry('lala', 'value')]))

    expect(called).toBeFalsy()
})

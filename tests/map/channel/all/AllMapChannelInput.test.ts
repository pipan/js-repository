import 'ts-jest'
import { Channels, SimpleChange, MapChannel, MapEntry } from '../../../../src'

const instances: any = [
    [() => { return Channels.createMap() }]
]

test.each(instances)("empty channel - dispatch insert - returns filled map", (channelFactory) => {
    const channel: MapChannel<string, string> = channelFactory()

    channel.dispatch(new SimpleChange([new MapEntry('key', 'value')], []))

    const result: Map<string, string> = channel.get()

    expect(result.size).toEqual(1)
})

test.each(instances)("filled channel - dispatch insert same key - returns same size map", (channelFactory) => {
    const channel: MapChannel<string, string> = channelFactory()

    channel.dispatch(new SimpleChange([new MapEntry('key', 'value')], []))
    channel.dispatch(new SimpleChange([new MapEntry('key', 'value')], []))

    const result: Map<string, string> = channel.get()

    expect(result.size).toEqual(1)
})

test.each(instances)("filled channel - dispatch remove - returns empty map", (channelFactory) => {
    const channel: MapChannel<string, string> = channelFactory()

    channel.dispatch(new SimpleChange([new MapEntry('key', 'value')], []))
    channel.dispatch(new SimpleChange([], [new MapEntry('key', 'value')]))

    const result: Map<string, string> = channel.get()

    expect(result.size).toEqual(0)
})

test.each(instances)("filled channel - dispatch remove with undefined value - returns empty map", (channelFactory) => {
    const channel: MapChannel<string, string> = channelFactory()

    channel.dispatch(new SimpleChange([new MapEntry('key', 'value')], []))
    channel.dispatch(new SimpleChange([], [new MapEntry('key', undefined)]))

    const result: Map<string, string> = channel.get()

    expect(result.size).toEqual(0)
})
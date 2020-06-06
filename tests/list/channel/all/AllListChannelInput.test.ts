import 'ts-jest'
import { ListChannel, Channels, SimpleChange, Comparables } from '../../../../src';

const instances: any = [
    [(values: Array<string> = []) => { return Channels.createList(values) }],
    [(values: Array<string> = []) => { return Channels.createOrderedList(Comparables.stringAsc(), values) }]
]

test.each(instances)("empty channel - dispatch insert - returns filled array", (channelFactory) => {
    const channel: ListChannel<string> = channelFactory()

    channel.dispatch(new SimpleChange(['test'], []))

    const result: Array<string> = channel.get()

    expect(result.length).toEqual(1)
});

test.each(instances)("filled channel - dispatch insert with same value - returns changed array", (channelFactory) => {
    const channel: ListChannel<string> = channelFactory(['test'])

    channel.dispatch(new SimpleChange(['test'], []))

    const result: Array<string> = channel.get()

    expect(result.length).toEqual(2)
});

test.each(instances)("filled channel - dispatch remove - returns empty array", (channelFactory) => {
    const channel: ListChannel<string> = channelFactory(['test'])

    channel.dispatch(new SimpleChange([], ['test']))

    const result: Array<string> = channel.get()

    expect(result.length).toEqual(0)
});

test.each(instances)("filled channel with two same items - dispatch remove - removes one item", (channelFactory) => {
    const channel: ListChannel<string> = channelFactory(['test', 'test'])

    channel.dispatch(new SimpleChange([], ['test']))

    const result: Array<string> = channel.get()

    expect(result.length).toEqual(1)
});

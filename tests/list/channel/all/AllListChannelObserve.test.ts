import 'ts-jest'
import { ListChannel, Channels, SimpleChange, Change, Comparables } from '../../../../src';
import { Adaptable } from '@wildebeest/observable';

class UniqueAdapter implements Adaptable<string, string> {
    public adapt (item: string): string {
        return item
    }
}

const instances: any = [
    [(values: Array<string> = []) => { return Channels.createList(values) }],
    [(values: Array<string> = []) => { return Channels.createOrderedList(Comparables.stringAsc(), values) }],
    [(values: Array<string> = []) => { return Channels.createUniqueList(new UniqueAdapter(), values)}]
]

test.each(instances)("(%#) empty channel - dispatch empty change - does not trigger change", (channelFactory) => {
    const channel: ListChannel<string> = channelFactory()
    let called = false
    channel.connectFn((change: Change<string>) => {
        called = true
    })

    channel.dispatch(new SimpleChange([], []))

    expect(called).toBeFalsy()
});

test.each(instances)("(%#) empty channel - dispatch insert - trigers connected function", (channelFactory) => {
    const channel: ListChannel<string> = channelFactory()

    let called = false
    channel.connectFn((change: Change<string>) => {
        expect(change.inserted().length).toBe(1)
        expect(change.removed().length).toBe(0)
        called = true
    })

    channel.dispatch(new SimpleChange(['test'], []))

    expect(called).toBeTruthy()
});

test.each(instances)("(%#) filled channel - dispatch remove - triggers connected function", (channelFactory) => {
    const channel: ListChannel<string> = channelFactory(['test'])

    let called = false
    channel.connectFn((change: Change<string>) => {
        expect(change.inserted().length).toBe(0)
        expect(change.removed().length).toBe(1)
        called = true
    })
    channel.dispatch(new SimpleChange([], ['test']))

    expect(called).toBeTruthy()
});

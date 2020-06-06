import 'ts-jest'
import { ListChannel, Channels, SimpleChange, Change, Comparables } from '../../../../src'

const instances: any = [
    [(values: Array<string> = []) => { return Channels.createList(values) }],
    [(values: Array<string> = []) => { return Channels.createOrderedList(Comparables.stringAsc(), values) }]
]

test.each(instances)("(%#) filled channel with two same items - dispatch remove - triggers connected function", (channelFactory) => {
    const channel: ListChannel<string> = channelFactory(['test', 'tes'])

    let called = false
    channel.connectFn((change: Change<string>) => {
        expect(change.inserted().length).toBe(0)
        expect(change.removed().length).toBe(1)
        called = true
    })
    channel.dispatch(new SimpleChange([], ['test']))

    expect(called).toBeTruthy()
})

test.each(instances)("(%#) filled channel - dispatch insert with same value - triggers connected function", (channelFactory) => {
    const channel: ListChannel<string> = channelFactory(['test'])

    let called = false
    channel.connectFn((change: Change<string>) => {
        expect(change.inserted().length).toBe(1)
        expect(change.removed().length).toBe(0)
        called = true
    })

    channel.dispatch(new SimpleChange(['test'], []))

    expect(called).toBeTruthy()
})
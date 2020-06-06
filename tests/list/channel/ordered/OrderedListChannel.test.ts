import 'ts-jest'
import { ListChannel, Channels, SimpleChange, Comparables } from '../../../../src'

test("filled channel unordered - construct - returns filled array ordered", () => {
    const channel: ListChannel<string> = Channels.createOrderedList(Comparables.stringAsc(), ['z', 'g', 'a'])

    const result: Array<string> = channel.get()

    expect(result.length).toEqual(3)
    expect(result[0]).toEqual('a')
    expect(result[1]).toEqual('g')
    expect(result[2]).toEqual('z')
})

test("filled channel - dispatch insert - returns filled array insert at start", () => {
    const channel: ListChannel<string> = Channels.createOrderedList(Comparables.stringAsc(), ['g', 'z'])

    channel.dispatch(new SimpleChange(['a'], []))

    const result: Array<string> = channel.get()

    expect(result.length).toEqual(3)
    expect(result[0]).toEqual('a')
    expect(result[1]).toEqual('g')
    expect(result[2]).toEqual('z')
})

test("filled channel - dispatch insert - returns filled array insert at middle", () => {
    const channel: ListChannel<string> = Channels.createOrderedList(Comparables.stringAsc(), ['a', 'z'])

    channel.dispatch(new SimpleChange(['g'], []))

    const result: Array<string> = channel.get()

    expect(result.length).toEqual(3)
    expect(result[0]).toEqual('a')
    expect(result[1]).toEqual('g')
    expect(result[2]).toEqual('z')
})

test("filled channel - dispatch insert - returns filled array insert at end", () => {
    const channel: ListChannel<string> = Channels.createOrderedList(Comparables.stringAsc(), ['a', 'g'])

    channel.dispatch(new SimpleChange(['z'], []))

    const result: Array<string> = channel.get()

    expect(result.length).toEqual(3)
    expect(result[0]).toEqual('a')
    expect(result[1]).toEqual('g')
    expect(result[2]).toEqual('z')
})

import 'ts-jest'
import { ListChannel, Channels, Comparables } from '../../../../src';
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

test.each(instances)("(%#) empty channel - get - returns empty array", (channeLFactory) => {
    const channel: ListChannel<string> = channeLFactory()

    const result: Array<string> = channel.get()

    expect(result).toEqual([])
});

test.each(instances)("(%#) filled channel in constructor - get - returns filled array", (channeLFactory) => {
    const channel: ListChannel<string> = channeLFactory(['test'])

    const result: Array<string> = channel.get()

    expect(result.length).toEqual(1)
    expect(result[0]).toEqual('test')
});

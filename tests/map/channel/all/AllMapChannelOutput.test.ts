import 'ts-jest'
import { Channels, MapChannel } from '../../../../src'

const instances: any = [
    [() => { return Channels.createMap() }]
]

test.each(instances)("(%#) empty channel - get - returns empty map", (channeLFactory) => {
    const channel: MapChannel<string, string> = channeLFactory()

    const result: Map<string, string> = channel.get()

    expect(result.size).toEqual(0)
})

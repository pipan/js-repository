import 'ts-jest'
import { ListChannel, Channels, SimpleChange } from '../../../../src'
import { Adaptable } from '@wildebeest/observable'

class Entity {
    public id: string
    public name: string

    public constructor (id: string, name: string) {
        this.id = id
        this.name = name
    }
}

class UniqueEntityAdapter implements Adaptable<Entity, string> {
    public adapt (entity: Entity): string {
        return entity.id
    }
}


test("empty channel - dispatch insert with the same key - returns array with the same length", () => {
    const channel: ListChannel<Entity> = Channels.createUniqueList(new UniqueEntityAdapter())

    channel.dispatch(new SimpleChange([new Entity('1', 'test')], []))
    channel.dispatch(new SimpleChange([new Entity('1', 'value')], []))

    const result: Array<Entity> = channel.get()

    expect(result.length).toEqual(1)
    expect(result[0].name).toEqual('value')
})

test("empty channel - dispatch remove by instance - removes item", () => {
    const channel: ListChannel<Entity> = Channels.createUniqueList(new UniqueEntityAdapter())

    const item = new Entity('1', 'test')
    channel.dispatch(new SimpleChange([item], []))
    channel.dispatch(new SimpleChange([], [item]))

    const result: Array<Entity> = channel.get()

    expect(result.length).toEqual(0)
})

test("empty channel - dispatch remove by id - removes item", () => {
    const channel: ListChannel<Entity> = Channels.createUniqueList(new UniqueEntityAdapter())

    channel.dispatch(new SimpleChange([new Entity('1', 'test')], []))
    channel.dispatch(new SimpleChange([], [new Entity('1', 'test')]))

    const result: Array<Entity> = channel.get()

    expect(result.length).toEqual(0)
})
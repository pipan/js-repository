import 'ts-jest'
import { Repository, SimpleRepository } from '../../src'
import { Identifiable } from '../../src/identify/Identifiable'

class Entity implements Identifiable {
    public id: string
    public name: string

    public constructor (id: string, name: string) {
        this.id = id
        this.name = name
    }

    public identify (): string {
        return this.id
    }
}

test("query property - empty repository - result undefined", () => {
    const repository: Repository<Entity> = SimpleRepository.createIdentifiable() 

    let result: Entity = null
    repository.query().property('1')
        .connectFn((value: Entity) => {
            result = value
        })

    expect(result).toBeUndefined()
})

test("query property - insert item - calls callback", () => {
    const repository: Repository<Entity> = SimpleRepository.createIdentifiable() 

    let result: Entity = null
    repository.query().property('1')
        .connectFn((value: Entity) => {
            result = value
        })

    repository.insert(new Entity('1', 'test'))

    expect(result.name).toEqual('test')
})

test("query property - replace item - calls callback", () => {
    const repository: Repository<Entity> = SimpleRepository.createIdentifiable()
    repository.insert(new Entity('1', 'test'))

    let result: Entity = null
    repository.query().property('1')
        .connectFn((value: Entity) => {
            result = value
        })

    repository.insert(new Entity('1', 'value'))

    expect(result.name).toEqual('value')
})

test("query property - remove item - calls callback", () => {
    const repository: Repository<Entity> = SimpleRepository.createIdentifiable()
    repository.insert(new Entity('1', 'test'))

    let result: Entity = null
    repository.query().property('1')
        .connectFn((value: Entity) => {
            result = value
        })

    repository.remove(new Entity('1', 'test'))

    expect(result).toBeUndefined()
})

test("query property - insert item with different id - does not call callback", () => {
    const repository: Repository<Entity> = SimpleRepository.createIdentifiable()
    repository.insert(new Entity('1', 'test'))

    let result: Entity = null
    repository.query().property('1')
        .connectFn((value: Entity) => {
            result = value
        })

    repository.insert(new Entity('2', 'two'))

    expect(result.name).toEqual('test')
})

test("query property - remove item with different id - does not call callback", () => {
    const repository: Repository<Entity> = SimpleRepository.createIdentifiable()
    repository.insert(new Entity('1', 'test'))
    repository.insert(new Entity('2', 'two'))

    let result: Entity = null
    repository.query().property('1')
        .connectFn((value: Entity) => {
            result = value
        })

    repository.remove(new Entity('2', 'two'))

    expect(result.name).toEqual('test')
})

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

test("empty repositar - query map - callback is called with empty map", () => {
    const repository: Repository<Entity> = new SimpleRepository() 

    let result: Map<string, Entity> = null
    repository.query().map()
        .connectFn((value: Map<string, Entity>) => {
            result = value
        })

    expect(result.size).toEqual(0)
})

test("filled repositar - query map - callback is called with filled map", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insert(new Entity('1', 'test'))

    let result: Map<string, Entity> = null
    repository.query().map()
        .connectFn((value: Map<string, Entity>) => {
            result = value
        })

    expect(result.size).toEqual(1)
    expect(result.get('1').name).toEqual('test')
})

test("filled repositar - query map - multiple items", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insert(new Entity('1', 'test'))
    repository.insert(new Entity('2', 'abc'))

    let result: Map<string, Entity> = null
    repository.query().map()
        .connectFn((value: Map<string, Entity>) => {
            result = value
        })

    expect(result.size).toEqual(2)
    expect(result.get('1').name).toEqual('test')
    expect(result.get('2').name).toEqual('abc')
})

test("query map - insert item - calls callback", () => {
    const repository: Repository<Entity> = new SimpleRepository() 

    let result: Map<string, Entity> = null
    repository.query().map()
        .connectFn((value: Map<string, Entity>) => {
            result = value
        })

    repository.insert(new Entity('1', 'test'))

    expect(result.size).toEqual(1)
})

test("query filtered map - insert item filtered out - does not call callback", () => {
    const repository: Repository<Entity> = new SimpleRepository() 

    let result: Map<string, Entity> = null
    repository.query().filter('name', '=', 'only')
        .map()
        .connectFn((value: Map<string, Entity>) => {
            result = value
        })

    repository.insert(new Entity('1', 'test'))

    expect(result.size).toEqual(0)
})

test("query filtered map - insert item within filter - calls callback", () => {
    const repository: Repository<Entity> = new SimpleRepository() 

    let result: Map<string, Entity> = null
    repository.query().filter('name', '=', 'only')
        .map()
        .connectFn((value: Map<string, Entity>) => {
            result = value
        })

    repository.insert(new Entity('1', 'only'))

    expect(result.size).toEqual(1)
})

test("query map - replace item - calls callback", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insert(new Entity('1', 'test'))

    let result: Map<string, Entity> = null
    repository.query().map()
        .connectFn((value: Map<string, Entity>) => {
            result = value
        })

    repository.insert(new Entity('1', 'value'))

    expect(result.size).toEqual(1)
    expect(result.get('1').name).toEqual('value')
})

test("query map - remove item - calls callback", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insert(new Entity('1', 'test'))

    let result: Map<string, Entity> = null
    repository.query().map()
        .connectFn((value: Map<string, Entity>) => {
            result = value
        })

    repository.remove(new Entity('1', 'value'))

    expect(result.size).toEqual(0)
})

test("query map - clear - calls callback", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insert(new Entity('1', 'test'))

    let result: Map<string, Entity> = null
    repository.query().map()
        .connectFn((value: Map<string, Entity>) => {
            result = value
        })

    repository.clear()

    expect(result.size).toEqual(0)
})

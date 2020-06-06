import 'ts-jest'
import { Repository, SimpleRepository } from '../../src';
import { Identifiable } from '../../src/identify/Identifiable';

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

test("empty repositar - query list and connect - callback is called with empty array", () => {
    const repository: Repository<Entity> = new SimpleRepository() 

    let result: Array<Entity> = null
    repository.query().list()
        .connectFn((value: Array<Entity>) => {
            result = value
        })

    expect(result).toEqual([])
});

test("filled repositar - query list and connect - callback is called with filled array", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insert(new Entity('1', 'test'))

    let result: Array<Entity> = null
    repository.query().list()
        .connectFn((value: Array<Entity>) => {
            result = value
        })

    expect(result.length).toEqual(1)
});

test("filled repositar - query list - array is not ordered", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insert(new Entity('1', 'test'))
    repository.insert(new Entity('2', 'abc'))

    let result: Array<Entity> = null
    repository.query().list()
        .connectFn((value: Array<Entity>) => {
            result = value
        })

    expect(result.length).toEqual(2)
    expect(result[0].name).toEqual('test')
    expect(result[1].name).toEqual('abc')
});

test("filled repositar - query ordered list - array is ordered", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insert(new Entity('1', 'test'))
    repository.insert(new Entity('2', 'abc'))

    let result: Array<Entity> = null
    repository.query().orderBy('name')
        .list()
        .connectFn((value: Array<Entity>) => {
            result = value
        })

    expect(result.length).toEqual(2)
    expect(result[0].name).toEqual('abc')
    expect(result[1].name).toEqual('test')
});

test("query list - insert item - calls callback", () => {
    const repository: Repository<Entity> = new SimpleRepository() 

    let result: Array<Entity> = null
    repository.query().list()
        .connectFn((value: Array<Entity>) => {
            result = value
        })

    repository.insert(new Entity('1', 'test'))

    expect(result.length).toEqual(1)
});

test("query filtered list - insert item filtered out - does not call callback", () => {
    const repository: Repository<Entity> = new SimpleRepository() 

    let result: Array<Entity> = null
    repository.query().filter('name', '=', 'only')
        .list()
        .connectFn((value: Array<Entity>) => {
            result = value
        })

    repository.insert(new Entity('1', 'test'))

    expect(result.length).toEqual(0)
});

test("query filtered list - insert item within filter - calls callback", () => {
    const repository: Repository<Entity> = new SimpleRepository() 

    let result: Array<Entity> = null
    repository.query().filter('name', '=', 'only')
        .list()
        .connectFn((value: Array<Entity>) => {
            result = value
        })

    repository.insert(new Entity('1', 'only'))

    expect(result.length).toEqual(1)
});

test("query list - replace item - calls callback", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insert(new Entity('1', 'test'))

    let result: Array<Entity> = null
    repository.query().list()
        .connectFn((value: Array<Entity>) => {
            result = value
        })

    repository.insert(new Entity('1', 'value'))

    expect(result.length).toEqual(1)
    expect(result[0].name).toEqual('value')
});

test("query list - remove item - calls callback", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insert(new Entity('1', 'test'))

    let result: Array<Entity> = null
    repository.query().list()
        .connectFn((value: Array<Entity>) => {
            result = value
        })

    repository.remove(new Entity('1', 'value'))

    expect(result.length).toEqual(0)
});

test("query list - clear - calls callback", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insert(new Entity('1', 'test'))

    let result: Array<Entity> = null
    repository.query().list()
        .connectFn((value: Array<Entity>) => {
            result = value
        })

    repository.clear()

    expect(result.length).toEqual(0)
});
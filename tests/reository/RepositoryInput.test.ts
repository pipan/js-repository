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

test("empty repositar - insert item - adds one item to repository", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insert(new Entity('1', 'test'))

    const result = repository.get()

    expect(result.length).toEqual(1)
});

test("empty repositar - insert all items - adds two items to repository", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insertAll([
        new Entity('1', 'test'),
        new Entity('2', 'test')
    ])

    const result = repository.get()

    expect(result.length).toEqual(2)
});

test("empty repositar - insert all items same id - adds last item to repository", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insertAll([
        new Entity('1', 'one'),
        new Entity('1', 'two')
    ])

    const result = repository.get()

    expect(result.length).toEqual(1)
    expect(result[0].name).toEqual('two')
});

test("filled repositar - remove item by reference - removes first item", () => {
    const item: Entity = new Entity('1', 'one')
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insertAll([
        item,
        new Entity('2', 'two')
    ])

    repository.remove(item)

    const result = repository.get()

    expect(result.length).toEqual(1)
});

test("filled repositar - remove item by identity - removes first item", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insertAll([
        new Entity('1', 'one'),
        new Entity('2', 'two')
    ])

    repository.remove(new Entity('1', 'one'))

    const result = repository.get()

    expect(result.length).toEqual(1)
});

test("filled repositar - remove all items by identity - removes all items", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insertAll([
        new Entity('1', 'one'),
        new Entity('2', 'two')
    ])

    repository.removeAll([
        new Entity('1', 'one'),
        new Entity('2', undefined)
    ])

    const result = repository.get()

    expect(result.length).toEqual(0)
});

test("filled repositar - remove all items including non existing - removes all existing items", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insertAll([
        new Entity('1', 'one'),
        new Entity('2', 'two')
    ])

    repository.removeAll([
        new Entity('001', 'one'),
        new Entity('1', 'one'),
        new Entity('3', undefined)
    ])

    const result = repository.get()

    expect(result.length).toEqual(1)
});

test("filled repositar - clear - removes all items", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insertAll([
        new Entity('1', 'one'),
        new Entity('2', 'two')
    ])

    repository.clear()

    const result = repository.get()

    expect(result.length).toEqual(0)
});

test("filled repositar - setAll - sets all values to new list", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insertAll([
        new Entity('1', 'one'),
        new Entity('2', 'two')
    ])

    repository.setAll([
        new Entity('x-01', 'test')
    ])

    const result = repository.get()

    expect(result.length).toEqual(1)
});

test("filled repositar - setAll with empty array - clears repository", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insertAll([
        new Entity('1', 'one'),
        new Entity('2', 'two')
    ])

    repository.setAll([])

    const result = repository.get()

    expect(result.length).toEqual(0)
});

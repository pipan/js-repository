import 'ts-jest'
import { Repository, SimpleRepository, Change } from '../../src'
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

test("empty repositary - insert item - trigers change callback", () => {
    const repository: Repository<Entity> = new SimpleRepository() 

    let called = false 
    repository.connectFn((change: Change<Entity>) => {
        expect(change.inserted().length).toEqual(1)
        expect(change.removed().length).toEqual(0)
        called = true
    })

    repository.insert(new Entity('1', 'test'))

    expect(called).toBeTruthy()
})

test("empty repositary - remove item - trigers change callback", () => {
    const repository: Repository<Entity> = new SimpleRepository() 
    repository.insert(new Entity('1', 'test'))

    let called = false 
    repository.connectFn((change: Change<Entity>) => {
        expect(change.inserted().length).toEqual(0)
        expect(change.removed().length).toEqual(1)
        called = true
    })

    repository.remove(new Entity('1', 'test'))

    expect(called).toBeTruthy()
})
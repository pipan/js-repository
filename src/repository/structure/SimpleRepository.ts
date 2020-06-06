import { Identifiable } from "../../identify/Identifiable";
import { Repository } from "./Repository";
import { Channels } from "../../Channels";
import { IdentityAdapter } from "../../identify/IdentityAdapter";
import { ListChannel } from "../../list/structure/ListChannel";
import { SimpleChange } from "../../change/SimpleChange";
import { QueryBuilder } from "../query/QueryBuilder";

export class SimpleRepository<T extends Identifiable> implements Repository<T> {
    private source: ListChannel<T>

    public constructor () {
        this.source = Channels.createUniqueList(new IdentityAdapter())
    }

    public query (): QueryBuilder<T> {
        return new QueryBuilder(this.source)
    }

    public get (): Array<T> {
        return this.source.get()
    }

    public insert (item: T): void {
        this.insertAll([item])
    }

    public insertAll (items: Array<T>): void {
        this.change(items, [])
    }

    public remove (item: T): void {
        this.removeAll([item])
    }

    public removeAll (items: Array<T>): void {
        this.change([], items)
    }

    public setAll (items: Array<T>): void {
        this.change(items, this.source.get())
    }

    public clear (): void {
        this.change([], this.source.get())
    }

    public change (insert: Array<T>, remove: Array<T>): void {
        this.source.dispatch(new SimpleChange(insert, remove))
    }
}
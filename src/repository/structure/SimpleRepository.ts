import { Identifiable } from "../../identify/Identifiable";
import { Repository } from "./Repository";
import { Channels } from "../../Channels";
import { IdentityAdapter } from "../../identify/IdentityAdapter";
import { ListChannel } from "../../list/structure/ListChannel";
import { SimpleChange } from "../../change/SimpleChange";
import { QueryBuilder } from "../query/QueryBuilder";
import { Closable, Dispatchable, Adaptable } from "@wildebeest/observable";
import { Change } from "../../change/Change";
import { KeyIdentityAdapter } from "../../identify/KeyIdentityAdapter";
import { SlefIdentityAdapter } from "../../identify/SelfIdentityAdapter";

export class SimpleRepository<T> implements Repository<T> {
    private source: ListChannel<T>
    private identityAdapter: Adaptable<any, string>

    public constructor (source: ListChannel<T>, identityAdapter: Adaptable<any, string>) {
        this.source = source
        this.identityAdapter = identityAdapter
    }

    public static createIdentifiable<T extends Identifiable> (): Repository<T> {
        return SimpleRepository.withIndex(new IdentityAdapter())
    }

    public static fromKeyProperty<T> (key: string): Repository<T> {
        return SimpleRepository.withIndex(new KeyIdentityAdapter(key))
    }

    public static fromString<T> (): Repository<T> {
        return SimpleRepository.withIndex(new SlefIdentityAdapter())
    }

    public static withIndex<T> (adapter: Adaptable<any, string>): Repository<T> {
        return new SimpleRepository(Channels.createUniqueList(adapter), adapter)
    }

    public query (): QueryBuilder<T> {
        return new QueryBuilder(this.source, this.identityAdapter)
    }

    public get (): Array<T> {
        return this.source.get()
    }

    public connect (dispatcher: Dispatchable<Change<T>>): Closable {
        return this.source.connect(dispatcher)
    }

    public connectFn (fn: (item: Change<T>) => void): Closable {
        return this.source.connectFn(fn)
    }

    public disconnect (dispatcher: Dispatchable<Change<T>>): void {
        this.source.disconnect(dispatcher)
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
import { ObservableMap } from "./ObservableMap";
import { SimpleMapOutput } from "../output/SimpleMapOuput";
import { MapEntry } from "../MapEntry";
import { MapChange } from "../MapChange";
import { Dispatchable, Closable } from "@wildebeest/observable";
import { MapChannel } from "./MapChannel";
import { ChangeInput } from "../../change/input/ChangeInput";
import { SimpleChangeInput } from "../../change/input/SimpleChangeInput";
import { Change } from "../../change/Change";
import { SimpleMapChannel } from "./SimpleMapChannel";

export class SimpleObservableMap<T, U> implements ObservableMap<T, U> {
    protected mapChannel: MapChannel<T, U>
    protected input: ChangeInput<MapEntry<T, U>>
    protected output: SimpleMapOutput<T, U>

    public constructor () {
        this.mapChannel = new SimpleMapChannel()
        this.input = new SimpleChangeInput()
        this.output = new SimpleMapOutput()

        this.input.connect(this.mapChannel)
        this.mapChannel.connectFn((change: Change<MapEntry<T, U>>) => {
            const data: Map<T, U> = new Map(this.mapChannel.get())
            this.output.dispatch(new MapChange(data, change.inserted(), change.removed()))
        })
    }

    public connect (dispatcher: Dispatchable<MapChange<T, U>>): Closable {
        return this.output.connect(dispatcher)
    }

    public connectFn (fn: (change: MapChange<T, U>) => void): Closable {
        return this.output.connectFn(fn)
    }

    public disconnect (dispatcher: Dispatchable<MapChange<T, U>>): void {
        this.output.disconnect(dispatcher)
    }

    public getAll (): Array<MapEntry<T, U>> {
        return this.output.getAll()
    }

    public get (key: T): U | undefined {
        return this.output.get(key)
    }

    public contains (key: T): boolean {
        return this.mapChannel.get().has(key)
    }

    public isEmpty (): boolean {
        return this.output.isEmpty()
    }

    public count (): number {
        return this.output.count()
    }

    public forEach (fn: (value: U, key: T) => void): void {
        this.output.forEach(fn)
    }

    public insert (key: T, value: U): void {
        this.input.insert([new MapEntry(key, value)])
    }

    public remove (key: T): void {
        this.removeAll([key])
    }

    public removeAll (keys: Array<T>): void {
        const toRemove: Array<MapEntry<T, U>> = []
        for (const key of keys) {
            toRemove.push(new MapEntry(key, this.mapChannel.get().get(key)))
        }
        
        this.removeAllEntries(toRemove)
    }

    private removeAllEntries (entries: Array<MapEntry<T, U>>): void {
        this.input.remove(entries)
    }

    public clear (): void {
        const toRemove: Array<MapEntry<T, U>> = []
        this.mapChannel.get().forEach((value: U, key: T) => {
            toRemove.push(new MapEntry(key, value))
        })
        this.removeAllEntries(toRemove)
    }
}
import { Dispatchable, Closable } from "@wildebeest/observable"
import { SimpleObservableListOutput } from "../output/SimpleObservableListOutput"
import { ObservableList } from "./ObservableList"
import { ListChange } from "../ListChange"
import { ListChannel } from "./ListChannel"
import { ChangeInput } from "../../change/input/ChangeInput"
import { SimpleChangeInput } from "../../change/input/SimpleChangeInput"
import { Change } from "../../change/Change"

export class ObservableListFrame<T> implements ObservableList<T> {
    protected input: ChangeInput<T>
    protected output: SimpleObservableListOutput<T>
    protected listChannel: ListChannel<T>

    public constructor (listChannel: ListChannel<T>) {
        this.listChannel = listChannel
        this.input = new SimpleChangeInput()
        this.output = new SimpleObservableListOutput(this.listChannel.get())

        this.input.connect(this.listChannel)
        this.listChannel.connectFn((change: Change<T>) => {
            const data: Array<T> = [...this.listChannel.get()]
            this.output.dispatch(new ListChange(data, change.inserted(), change.removed()))
        })
    }

    public connect (dispatcher: Dispatchable<ListChange<T>>): Closable {
        return this.output.connect(dispatcher)
    }

    public connectFn (fn: (change: ListChange<T>) => void): Closable {
        return this.output.connectFn(fn)
    }

    public disconnect (dispatcher: Dispatchable<ListChange<T>>): void {
        this.output.disconnect(dispatcher)
    }

    public getAll (): Array<T> {
        return this.output.getAll()
    }

    public get (index: number): T | undefined {
        return this.output.get(index)
    }

    public count (): number {
        return this.output.count()
    }

    public isEmpty (): boolean {
        return this.output.isEmpty()
    }

    public contains (item: T): boolean {
        return this.output.contains(item)
    }

    public insert (item: T): void {
        this.insertAll([item])
    }

    public insertAll (items: Array<T>): void {
        this.input.insert(items)
    }

    public remove (item: T): void {
        this.removeAll([item])
    }

    public removeAll (items: Array<T>): void {
        this.input.remove(items)
    }

    public setAll (items: Array<T>): void {
        this.clear()
        this.insertAll(items)
    }

    public clear (): void {
        this.removeAll(
            this.getAll()
        )
    }
}
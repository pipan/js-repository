import { QueryResult } from "./QueryResult";
import { ListQueryResult } from "./ListQueryResult";
import { Change } from "../../change/Change";
import { Channels } from "../../Channels";
import { PropertyEqualsFilter } from "../filter/PropertyEqualsFilter";
import { ListChannel } from "../../list/structure/ListChannel";
import { Comparables } from "../../Comparables";
import { PropertyQueryResult } from "./PropertyQueryResult";
import { Pipable, Pipe } from "@wildebeest/observable";
import { MapQueryResult } from "./MapQueryResult";
import { ObjectPropertyAdapter } from "../adapter/ObjectPropertyAdapter";

export class QueryBuilder<T> {
    private filters: Array<Pipable<Change<T>>>
    private orderKey: string
    private orderDirection: string
    private indexName: string
    private propertyIndexName: string
    private source: ListChannel<T>
    private operations: Map<string, (key: string, value: any) => Pipable<Change<T>>>

    public constructor (source: ListChannel<T>, propertyIndexName: string) {
        this.source = source
        this.filters = []
        this.indexName = 'identify'
        this.propertyIndexName = propertyIndexName

        this.operations = new Map()
        this.operations.set('=', (key: string, value: any) => {
            return new PropertyEqualsFilter(key, value)
        })
    }

    public filter (propertyName: string, operation: string, value: any): QueryBuilder<T> {
        if (!this.operations.has(operation)) {
            throw "Filter cannot be build, operations is not recognized: " + operation
        }
        this.filters.push(
            this.operations.get(operation)(propertyName, value)
        )
        return this
    }

    public orderBy (propertyName: string, direction = 'asc'): QueryBuilder<T> {
        this.orderKey = propertyName
        this.orderDirection = direction
        return this
    }

    // public groupBy (propertyName: string): QueryBuilder<T> {
        // todo
        // return this
    // }

    public indexBy (propertyName: string): QueryBuilder<T> {
        this.indexName = propertyName
        return this
    }

    public list (): QueryResult<Array<T>> {
        let channel: ListChannel<T>
        if (this.orderKey) {
            channel = Channels.createOrderedList(
                Comparables.property(this.orderKey, this.orderDirection)
            )
        } else {
            channel = Channels.createList()
        }

        return new ListQueryResult(
            this.source,
            channel,
            new Pipe(this.filters)
        )
    }

    public property (identityValue: any): QueryResult<T> {
        return new PropertyQueryResult(
            this.source,
            new Pipe([
                new PropertyEqualsFilter(this.propertyIndexName, identityValue)
            ])
        )
    }

    public map<U> (): QueryResult<Map<U, T>> {
        return new MapQueryResult(
            this.source,
            Channels.createIndexedMap(new ObjectPropertyAdapter(this.indexName)),
            new Pipe(this.filters)
        )
    }
}

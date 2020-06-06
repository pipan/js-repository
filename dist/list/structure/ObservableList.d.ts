import { ListInput } from "../input/ListInput";
import { ObservableListOutput } from "../output/ObservableListOutput";
export interface ObservableList<T> extends ListInput<T>, ObservableListOutput<T> {
}

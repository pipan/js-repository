import { PropertyInput } from "../input/PropertyInput";
import { ObservablePropertyOutput } from "../output/ObservablePropertyOutput";
export interface ObservableProperty<T> extends PropertyInput<T>, ObservablePropertyOutput<T> {
}

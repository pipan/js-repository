import { MapInput } from "../input/MapInput";
import { ObservableMapOutput } from "../output/ObservableMapOutput";
export interface ObservableMap<T, U> extends MapInput<T, U>, ObservableMapOutput<T, U> {
}

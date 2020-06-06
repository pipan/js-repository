import { RepositoryInput } from "../input/RepositoryInput";
import { RepositoryOutput } from "../output/RepositoryOutput";
import { Identifiable } from "../../identify/Identifiable";
export interface Repository<T extends Identifiable> extends RepositoryInput<T>, RepositoryOutput<T> {
}

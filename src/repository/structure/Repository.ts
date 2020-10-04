import { RepositoryInput } from "../input/RepositoryInput";
import { RepositoryOutput } from "../output/RepositoryOutput";

export interface Repository<T> extends RepositoryInput<T>, RepositoryOutput<T> {}
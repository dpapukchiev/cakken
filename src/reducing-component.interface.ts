import { Iterator} from './iterator.interface';

export interface IReducingComponent<S, T> {
    apply(iterator: Iterator<S>, reduced: T): Promise<T>;
    setNext(next: IReducingComponent<S, T>): void;
    canHandle(nextElement: S): boolean;
}
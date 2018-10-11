import { ReducingComponent } from "./reducing-component";
import { Iterator} from './iterator.interface';

export abstract class SingleItemReducingComponent<S, T> extends ReducingComponent<S, T>{

    apply(iterator: Iterator<S>, reduced: T): Promise<T> {

        if (this.canHandle(iterator.peek())) {
            return this.handle(iterator.next(), reduced);
        }
        return this.next.apply(iterator, reduced);
    };
    abstract handle(nextElement: S, reduced: T): Promise<T>;
    abstract canHandle(nextElement: S): boolean;
}
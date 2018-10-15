import { IReducingComponent } from "./reducing-component.interface";
import { NullReducingComponent } from "./null-reducing-component";
import { Iterator } from './iterator.interface';

export abstract class ReducingComponent<S, T> implements IReducingComponent<S, T>{

    protected next: IReducingComponent<S, T> = new NullReducingComponent();

    setNext(next: IReducingComponent<S, T>): void {
        this.next = next;
    }
    abstract apply(iterator: Iterator<S>, reduced: T): Promise<T>;
    abstract canHandle(nextElement: S): boolean;
}
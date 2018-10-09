import { Iterator } from './iterator.interface';

export class ItemIterator<T> implements Iterator<T>{

    private itemSequence: T[] = [];

    add(items: T[]): void {
        this.itemSequence.push(...items);
    }
    peek(): T {
        return this.itemSequence[0];
    }
    next(): T {
        return this.itemSequence.shift();
    }
    hasNext(): boolean {
        return this.itemSequence.length > 0;
    }
    getAll(): T[] {
        return this.itemSequence;
    }
    setAll(sequence: T[]): void {
        this.itemSequence = sequence;
    }
}
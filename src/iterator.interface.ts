
export interface Iterator<T> {
    add(sequence: T[]): void;
    peek(): T;
    next(): T;
    hasNext(): boolean;
    getAll(): T[];
    setAll(sequence: T[]): void;
}

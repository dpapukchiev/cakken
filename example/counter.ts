import { Chain, ItemIterator, SingleItemReducingComponent } from '../src';

class Item {
    constructor(
        public readonly key: number
    ) { }
}

class Counter {
    private _count: number = 0;
    public increment() {
        this._count += 1;
    }
    public decrement() {
        this._count -= 1;
    }
    public get count() {
        return this._count;
    }
}

class CountingComponentEven extends SingleItemReducingComponent<Item, Counter>{
    async handle(nextElement: Item, reduced: Counter): Promise<Counter> {
        reduced.increment();
        return reduced;
    }
    canHandle(nextElement: Item): boolean {
        return nextElement.key % 2 === 0;
    }
}

class CountingComponentOdd extends SingleItemReducingComponent<Item, Counter>{
    async handle(nextElement: Item, reduced: Counter): Promise<Counter> {
        reduced.decrement();
        return reduced;
    }
    canHandle(nextElement: Item): boolean {
        return nextElement.key % 2 > 0;
    }
}

const iterator = new ItemIterator<Item>().setAll([
    new Item(2),
    new Item(4),
    new Item(6),

    new Item(7),
    new Item(5),
]);

// Even numbers increment the counter, odd numbers decrement it
// Expected result it 1
const result = new Chain<Item, Counter>()
    .registerComponent(new CountingComponentEven())
    .registerComponent(new CountingComponentOdd())
    .build()
    .run(new Counter(), iterator);

result.then(c => {
    console.log(`Count: ${c.count}`);
}).catch(console.error)

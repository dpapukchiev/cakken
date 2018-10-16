import { Iterator } from './iterator.interface';
import { IReducingComponent } from './reducing-component.interface';
import { NullReducingComponent } from './null-reducing-component';
import { ItemIterator } from './item-iterator';

export class Chain<S, T>{

    private root: IReducingComponent<S, T> = new NullReducingComponent();
    private chainComponents: IReducingComponent<S, T>[] = [];

    public registerComponent(component: IReducingComponent<S, T>): Chain<S, T> {

        this.chainComponents.push(component);
        return this;
    }

    public getRoot() {

        this.validate();
        return this.root;
    }

    public build(): Chain<S, T> {

        this.validate();
        this.root = this.chainComponents[0];

        if (this.chainComponents.length > 1) {

            for (let i = 1; i < this.chainComponents.length; i++) {

                const previous = this.chainComponents[i - 1];
                const next = this.chainComponents[i];
                previous.setNext(next);
            }
        }
        return this;
    }

    public async run(initialValue: T, iterator: Iterator<S>): Promise<T> {

        this.validate();
        while (iterator.hasNext()) {

            initialValue = await this.root.apply(iterator, initialValue);
        }
        return initialValue;
    }

    public async runOne(initialValue: T, item: S): Promise<T> {

        this.validate();
        const iterator = new ItemIterator<S>();
        iterator.add([item]);
        return this.run(initialValue, iterator);
    }

    private validate() {

        if (this.chainComponents.length === 0) {

            throw new Error(`At least 1 component is required to create a chain.`);
        }
    }
}
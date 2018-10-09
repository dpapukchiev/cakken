import { ItemIterator, SingleItemReducingComponent, ReducingComponent, Chain } from "./src";

// Concrete
export class DomainEvent { }
export class UserCreated extends DomainEvent { }
export class AgeUpdated extends DomainEvent { }

export class EventIterator extends ItemIterator<DomainEvent>{ }

export class UserCreatedHandler extends SingleItemReducingComponent<DomainEvent, string>{

    async handle(userCreatedEvent: UserCreated, reduced: string): Promise<string> {
        console.log(`userCreatedEvent: ${JSON.stringify(userCreatedEvent)}`);
        return `userCreated ${reduced}`;
    }
    canHandle(nextElement: DomainEvent): boolean {
        return nextElement instanceof UserCreated;
    }
}

export class AgeUpdatedHandler extends SingleItemReducingComponent<DomainEvent, string>{

    async handle(ageUpdatedEvent: AgeUpdated, reduced: string): Promise<string> {
        console.log(`ageUpdatedEvent: ${JSON.stringify(ageUpdatedEvent)}`);
        return `ageUpdatedEvent ${reduced}`;
    }
    canHandle(nextElement: DomainEvent): boolean {
        return nextElement instanceof AgeUpdated;
    }
}
export class AgeUpdatedOnceHandler extends ReducingComponent<DomainEvent, string>{

    async apply(iterator: ItemIterator<DomainEvent>, reduced: string): Promise<string> {
        if (!this.canHandle(iterator.peek())) {
            return this.next.apply(iterator, reduced);
        }
        while (this.canHandle(iterator.peek())) {

            reduced += await this.handle(iterator.next(), reduced);
        }
        return reduced;
    }

    async handle(nextElement: DomainEvent, reduced: string): Promise<string> {

        return `. ${reduced}`;
    }

    canHandle(nextElement: DomainEvent): boolean {
        return nextElement instanceof AgeUpdated;
    }
}

(async function () {

    // Create iterator
    const iterator = new ItemIterator();
    iterator.add([new UserCreated()]);
    iterator.add([new AgeUpdated(), new AgeUpdated(), new AgeUpdated(), new AgeUpdated()]);

    // Create handler chain
    const chain = new Chain<DomainEvent, string>()
        .registerComponent(new UserCreatedHandler())
        .registerComponent(new AgeUpdatedHandler())
        .registerComponent(new AgeUpdatedOnceHandler())
    chain.build();

    const result = await chain.run('', iterator);
    console.log(result);
}())

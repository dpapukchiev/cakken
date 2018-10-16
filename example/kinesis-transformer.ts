import { Chain, ItemIterator, SingleItemReducingComponent } from '../src';
import { FirehoseTransformationResultHelper } from '../src/firehose-transformation-result-helper';

// Proceeds with elements with event keys
class EvenKeyComponent extends SingleItemReducingComponent<any, FirehoseTransformationResultHelper>{

    async handle(nextElement: any, result: FirehoseTransformationResultHelper): Promise<FirehoseTransformationResultHelper> {

        result.addOk(nextElement.id, nextElement.key, false);
        return result;
    }
    canHandle(nextElement: any): boolean {

        return nextElement.key % 2 === 0;
    }
}
// Fails items with key === 2
class TwoKeyFilterComponent extends SingleItemReducingComponent<any, FirehoseTransformationResultHelper>{

    async handle(nextElement: any, result: FirehoseTransformationResultHelper): Promise<FirehoseTransformationResultHelper> {

        result.addFailed(nextElement.id, nextElement.key, false);
        return result;
    }

    canHandle(nextElement: any): boolean {

        return nextElement.key === 2;
    }
}
// All other items are failed
class FailedSinkComponent extends SingleItemReducingComponent<any, FirehoseTransformationResultHelper>{

    async handle(nextElement: any, result: FirehoseTransformationResultHelper): Promise<FirehoseTransformationResultHelper> {

        result.addFailed(nextElement.id, nextElement.key, false);
        return result;
    }

    canHandle(nextElement: any): boolean {

        return true;
    }
}

const iterator = new ItemIterator<any>().setAll([
    { key: 1, id: 1 }, // Fail - key not even
    { key: 2, id: 2 }, // Fail - key = 2
    { key: 3, id: 3 }, // Fail - key not event
    { key: 4, id: 4 }, // OK - key even and != 2
    { key: 6, id: 6 }, // OK - key even and != 2
]);

// Even keys except 2 are added to the OK result, everything else fails
const result = new Chain<any, FirehoseTransformationResultHelper>()
    .registerComponent(new TwoKeyFilterComponent())
    .registerComponent(new EvenKeyComponent())
    .registerComponent(new FailedSinkComponent())
    .build()
    .run(new FirehoseTransformationResultHelper(), iterator);

result.then(f => {
    console.log(f.records);
}).catch(console.error)
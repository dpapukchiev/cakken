import { Chain, ItemIterator, SingleItemReducingComponent } from '../src';
import { FirehoseTransformationResultHelper } from '../src/firehose-transformation-result-helper';

class FirehoseChainComponent extends SingleItemReducingComponent<any, FirehoseTransformationResultHelper>{

    async handle(nextElement: any, reduced: FirehoseTransformationResultHelper): Promise<FirehoseTransformationResultHelper> {

        if (nextElement.key % 2 === 0) {

            reduced.addOk(nextElement.id, nextElement.key, false);
        } else {

            reduced.addFailed(nextElement.id, nextElement.key, false);
        }
        return reduced;
    }
    canHandle(nextElement: any): boolean {

        return true;
    }
}

const iterator = new ItemIterator<any>().setAll([
    { key: 1, id: 1 },
    { key: 2, id: 2 },
    { key: 3, id: 3 },
    { key: 4, id: 4 },
]);

// Even keys are added to the OK result, everything else fails
const result = new Chain<any, FirehoseTransformationResultHelper>()
    .registerComponent(new FirehoseChainComponent())
    .build()
    .run(new FirehoseTransformationResultHelper(), iterator);

result.then(f => {
    console.log(f.records);
}).catch(console.error)
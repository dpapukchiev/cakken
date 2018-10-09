import { IReducingComponent } from "./reducing-component.interface";
import { Iterator} from './iterator.interface';

export class NullReducingComponent implements IReducingComponent<any, any>{

    // If the null component is hit, the chain is complete
    // The chain resolves with the reduced value
    async apply(iterator: Iterator<any>, reduced: any): Promise<any> {
        // Next element is lost
        iterator.next();
        return reduced;
    }
    handle(nextElement: any, reduced: any): Promise<any> {
        return reduced;
    }
    setNext(next: IReducingComponent<any, any>): void {
        throw new Error("Null reducing component should not be used in a chain.");
    }
    canHandle(nextElement: any): boolean {
        return true;
    }
}
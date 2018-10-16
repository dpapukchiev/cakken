import { FirehoseTransformationResultRecord, FirehoseRecordTransformationStatus } from "aws-lambda";

export class FirehoseTransformationResultHelper {

    public readonly records: FirehoseTransformationResultRecord[] = [];

    addOk(id: string, payload: any, encodeJson: boolean = true) {

        this.addRecord(id, payload, encodeJson, 'Ok');
    }

    addDropped(id: string, payload: any, encodeJson: boolean = true) {

        this.addRecord(id, payload, encodeJson, 'Dropped');
    }

    addFailed(id: string, payload: any, encodeJson: boolean = true) {

        this.addRecord(id, payload, encodeJson, 'ProcessingFailed');
    }

    private addRecord(id: string, payload: any, encodeJson: boolean, result: FirehoseRecordTransformationStatus) {

        this.records.push({
            recordId: id,
            result,
            data: encodeJson ? Buffer.from(JSON.stringify(payload)).toString('base64') : Buffer.from(payload.toString()).toString('base64')
        });
    }
}
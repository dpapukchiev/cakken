import * as uuid from 'uuid/v4';
import { ExpectedVersion } from 'event-store-client';
import connection from './connection';

function send() {
    connection.writeEvents(
        'first',
        ExpectedVersion.Any,
        false,
        [{
            eventId: uuid(),
            data: {
                time: new Date().toISOString(),
                aggregateId: '1'
            },
            eventType: 'time',
            metadata: {
                version: '0.0.1'
            }
        }, {
            eventId: uuid(),
            data: {
                time: new Date().toISOString(),
                aggregateId: '2'
            },
            eventType: 'time',
            metadata: {
                version: '0.0.1'
            }
        }], null,
        (completed) => {

            console.log('completed');
            console.log(completed);
            // connection.close();
            setTimeout(() => send(), 500)
        }
    );
}
send();
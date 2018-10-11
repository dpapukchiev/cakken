import { Connection } from 'event-store-client';

const connection = new Connection({
    host: 'localhost',
    port: 1113,
    // debug: true,
    onError(e) {
        console.log('error');
        console.log(e);
    },
    onClose() {
        console.log('closed');
    },
    onConnect() {
        console.log('connected');
    },
    credentials: {
        username: 'test',
        password: 'test'
    }

});
export default connection;
import connection from './connection';

// connection.subscribeToStream(
//     'first',
//     false,
//     e => console.log(e),
//     c => console.log(c),
//     d => console.log(d),
//     null,
//     oh => console.log(oh)
// );

const subscription = connection.subscribeToStreamFrom(
    'first',
    null,
    null,
    e => console.log(e),
    () => console.log('caught up'),
    d => console.log(d),
    {
        resolveLinkTos: false,
        readBatchSize: 20,
        maxLiveQueueSize: 4,
        debug: false
    }
);

// subscription.start();
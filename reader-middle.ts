import connection from './connection';

connection.readStreamEventsForward(
    'test',
    0,
    100,
    true,
    true,
    e => console.log(e),
    null,
    c => console.log(c)
);


// connection.readAllEventsForward(
//     4,
//     300,
//     100,
//     false,
//     false,
//     e => console.log(e),
//     null,
//     c => console.log(c)
// );
const { MongoClient, ObjectID } = require('mongodb');  



const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db(dbName);


    const collectionName = 'Users';
    db.collection(collectionName).find({name:'JX'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    })

    // const collectionName = 'Todos';
    // db.collection(collectionName).find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // })


    // const collectionName = 'Todos';
    // db.collection(collectionName).find({
    //     _id: new ObjectID('5bd9c766715d8636307ee4de')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // })

    
    client.close();
});


//  Old code below

// const client = new MongoClient(url, { useNewUrlParser: true });

// client.connect((err) => {
//     if(err){
//         return console.log('Unable to connect to MongoDB server');
//     }

//     const db = client.db(dbName);
    
//     db.collection('Todos').insertOne({
//                 text: 'Something to do',
//                 completed: false
//             }, (err, result) => {
//                 if(err){
//                     return console.log('Unable to insert todo', err);
//                 }
        
//                 console.log(JSON.stringify(result.ops, undefined, 2));
//             });
//     client.close();
// });

// MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, db) => {
//     if(err){
//         return console.log('Unable to connect to MongoDB server');
//     }

//     console.log('Connected to MongoDB server');

//     db.collection('Todos').insertOne({
//         text: 'Something to do',
//         completed: false
//     }, (err, result) => {
//         if(err){
//             return console.log('Unable to insert todo', err);
//         }

//         console.log(JSON.stringify(result.ops, undefined, 2));
//     });

//     db.close();
// });
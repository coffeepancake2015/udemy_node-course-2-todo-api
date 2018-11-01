//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');  


//object destructuring, when same name then put cerly braces to get it out
// var user = {name: 'jx', age:21, location: 'cheras'};
// var {name, age} = user;
// console.log(name, age);

//  Create objectID in node js
// var obj = new ObjectID();
// console.log(obj);

const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';



MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db(dbName);

    const collectionName = 'Users';
    // db.collection('Todos').insertOne({
    //     text: 'Something to do 2',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection(collectionName).insertOne({
    //     name: 'JX',
    //     age: 21,
    //     location: 'KL'
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // });
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
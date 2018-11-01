const { MongoClient, ObjectID } = require('mongodb');  



const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db(dbName);


    const collectionName = 'Todos';
    db.collection(collectionName).find({name:'JX'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    })

    //  deleteMany
    // db.collection(collectionName).deleteMany({test:'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    
    //  deleteOne
    // db.collection(collectionName).deleteOne({text:'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    
    //  findOneAndDelete
    // db.collection(collectionName).findOneAndDelete({completed:false}).then((result) => {
    //     console.log(result);
    // });
    
    //////////////////  Challenge //////////////////////////
    var collectionUser = "Users";
    
    //  deleteMany
    // db.collection(collectionUser).deleteMany({name:'JXV'}).then((result) => {
    //     console.log(result);
    // });
    
    //  deleteOne
    // db.collection(collectionUser).deleteOne({_id : new ObjectID('5bdb130d6faedac7717160d7')}).then((result) => {
    //     console.log(result);
    // });
    
    //  findOneAndDelete
    db.collection(collectionUser).findOneAndDelete({name:'jenny'}).then((result) => {
        console.log(result);
    });
    
    //client.close();
});


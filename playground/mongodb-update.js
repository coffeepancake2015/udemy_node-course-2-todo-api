const { MongoClient, ObjectID } = require('mongodb');  



const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db(dbName);


    // const collectionName = 'Todos';

    // db.collection(collectionName).findOneAndUpdate({_id : new ObjectID('5bdb10b46faedac771716007')}, {
    //     $set: {
    //         completed: true
    //     }
    // },{
    //     returnOriginal:false
    // }).then((result) => {
    //     console.log(result);
    // });

    const collectionUsers = 'Users';
    db.collection(collectionUsers).findOneAndUpdate({_id: new ObjectID('5bd9ca4a6a77e5135044fb55')},{
        $set:{
            name:'Jenny'
        },
        $inc:{
            age:1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
    
    //client.close();
});


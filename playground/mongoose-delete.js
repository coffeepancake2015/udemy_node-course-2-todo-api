const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/model/todo');
const {User} = require('../server/model/user');

//  remove all records
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//Todo.findOneAndRemove
//Todo.findByIdAndDelete

Todo.findOneAndDelete({_id:'5bdd5c48e26233001561d89b'})
    .then((result) => {
        console.log(result);
    });

// Todo.findByIdAndRemove('5bdd5c4fe26233001561d89c').then((doc) => {
//     console.log(doc);
// });


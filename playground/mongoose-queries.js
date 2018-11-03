const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todo');
const {User} = require('./../server/model/user');

// var id =  '5bdc7c216095ff356c169efd';

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id : id
// }).then((todos) => {
//     console.log('Todos',todos);
// });

// Todo.findOne({
//     _id : id
// }).then((todo) => {
//     console.log('todo',todo);
// });

// Todo.findById(id)
//     .then((todo) => {
//         if(!todo){
//             return console.log('Id not found');
//         }
//         console.log('todo By ID',todo);
//     })
//     .catch((e) => console.log(e));

var userId = '5bdb24118fb0521f20a463cb';
User.findById(userId)
    .then((user) => {
        if(!user)
            return console.log('Unable to find user');
        console.log(JSON.stringify(user, undefined,2));
    })
    .catch((e) => console.log(e));
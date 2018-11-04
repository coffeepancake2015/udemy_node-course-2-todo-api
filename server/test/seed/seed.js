const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../model/todo');
const {User} = require('./../../model/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'andrew@example.com',
    password:'userOnePass',
    tokens:[{
        access:'auth',
        token: jwt.sign({_id: userOneId, access:'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'andrew2@example.com',
    password:'userTwoPass'
}];

const todos = [{
    _id: new ObjectID('5bdd4647d209462acc9fc908'),
    text:'Fist test todo'
},{
    _id: new ObjectID('5bdd46fa3a43791484df03bc'),
    text:'Second test todo',
    completed:true,
    completedAt:333
}];

const populateTodos = (done) => {
    Todo.remove({})
    .then(() => {
        return Todo.insertMany(todos);
    })
    .then(() => done())
    .catch((e) => {
        done(e);
    });
}

const pupulateUsers = (done) => {
    User.remove({})
    .then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne,userTwo]);
    })
    .then(() => done())
    .catch((e) => done(e));
};
module.exports = { todos, populateTodos, users, pupulateUsers}
require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const morgan = require('morgan');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./model/todo');
const {User} = require('./model/user');
var {authenticate} = require('./middleware/authenticate')

var app = express();
const port = process.env.PORT || 3000;  //  defind port for heroku

app.use(bodyParser.json());
//app.use(morgan('dev'));

app.post('/todos', authenticate, (req,res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos', authenticate, (req,res) => {
    Todo.find({_creator:req.user._id})
    .then((todos) => {
         res.send({todos})
    })
    .catch((e) => res.status(400).send);
});

app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id))
        return res.status(404).send();

    Todo.findOne({_id: id, _creator:req.user._id})
        .then((todo) => {
            if(todo)
                res.status(200).send({todo});
            else
                res.status(404).send();
        })
        .catch((e) => {
            return res.status(404).send();
        })
    //validate id using isValid
        //  404 - send back empty send

    //  findById
        //Success
            //  If todo - send it back
            //  if no todo - send back 404 with empty body
        //  error
            //  400 - and send empty body back
});

app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id))
        return res.status(404).send();

    Todo.findOneAndDelete({_id : id, _creator:req.user._id})
    .then((todo) =>{
        if(!todo)
            return res.status(404).send();
        
        res.status(200).send({todo:todo});
    }, (e) => {
        res.status(400).send(e);
    })
    
});

app.patch('/todos/:id', authenticate, (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id))
        return res.status(404).send();

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();    //Javascript timestamp
    }
    else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({_id:id, _creator:req.user._id}, {$set: body}, {new:true})
    .then((todo) => {
        if(!todo)
            return res.status(404).send();
        
        res.send({todo});
    })

    .catch((e) => {
        res.status(400).send();
    });
});


//  POST /users
app.post('/users', (req,res) => {
    var body =  _.pick(req.body, ['email','password']);
    var user = new User(body);

    user.save()
    .then(() => {
        return user.generateAuthToken();
    })
    .then((token) => {
        //console.log(token);
        res.header('x-auth', token).send(user);
    })
    .catch((e) => {
        res.status(400).send(e);
    });
    
});

app.get('/users/me', authenticate, (req,res) => {
    res.send(req.user);
});

//  POST /users/login {email, password}
app.post('/users/login', (req,res) => {
    var body = _.pick(req.body, ['email','password']);

    User.findByCredentials(body.email,body.password)
    .then((user) => {
        //res.send(user);
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    })
    .catch((e) =>{
        res.status(400).send(e);
    });

    //res.send(body);
});

app.delete('/users/me/token', authenticate, (req,res) => {
    req.user.removeToken(req.token)
    .then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
});

app.listen(port, () => {
    console.log('Started on port 3000');
});


module.exports = {app};









//  Not using anymore below
//  Mongoose Todos
// var Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }
// });

// var newTodo = new Todo({
//     text: '  sleep tomorrow!  '
// });

// newTodo.save().then((doc) => {
//     console.log(doc);
// }, (e) => {
//     console.log(e);
// });

//  Mongoose Users
// var User = mongoose.model('Users',{
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         minlength:1
//     }
// });

// var newUser = new User({
//     email: 'lalala@mail.com'
// });

// newUser.save().then((doc) => {
//     console.log(doc);
// },(err) =>  {
//     console.log(JSON.stringify(err, undefined, 2));
// });
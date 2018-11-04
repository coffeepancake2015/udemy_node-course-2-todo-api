const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const morgan = require('morgan');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./model/todo');
var {User} = require('./model/user');

var app = express();
const port = process.env.PORT || 3000;  //  defind port for heroku

app.use(bodyParser.json());
//app.use(morgan('dev'));

app.post('/todos', (req,res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos', (req,res) => {
    Todo.find()
        .then((todos) => {
            res.send({todos})
        })
        .catch((e) => res.status(400).send);
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id))
        return res.status(404).send();

    Todo.findById(id)
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

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id))
        return res.status(404).send();

    Todo.findOneAndDelete({_id : id})
    .then((todo) =>{
        if(!todo)
            return res.status(404).send();
        
        res.status(200).send({todo:todo});
    }, (e) => {
        res.status(400).send(e);
    })
    
});

app.patch('/todos/:id', (req,res) => {
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

    console.log(body);
    Todo.findByIdAndUpdate(id, {$set: body}, {new:true})
    .then((todo) => {
        if(!todo)
            return res.status(404).send();
        
        res.send({todo});
    })

    .catch((e) => {
        res.status(400).send();
    });
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
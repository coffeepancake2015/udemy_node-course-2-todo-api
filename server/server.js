var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser:true});

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
var User = mongoose.model('Users',{
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    }
});

var newUser = new User({
    email: 'lalala@mail.com'
});

newUser.save().then((doc) => {
    console.log(doc);
},(err) =>  {
    console.log(JSON.stringify(err, undefined, 2));
});
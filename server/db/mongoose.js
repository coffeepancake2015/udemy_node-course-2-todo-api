var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser:true});
//mongoose.connect('mongodb+srv://sucker:sucker@cluster0-ptkdz.mongodb.net/TodoApp?retryWrites=true', {useNewUrlParser:true});

//mongodb+srv://sucker:<PASSWORD>@cluster0-ptkdz.mongodb.net/test?retryWrites=true

module.exports = {mongoose};
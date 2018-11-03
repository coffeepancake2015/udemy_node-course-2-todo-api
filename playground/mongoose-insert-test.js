
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todo');


var textCount = `halo`;
    var todo = new Todo({
        text:textCount
    });

    todo.save()
        .then((doc) => {
            console.log(`successful insert ${doc}`);
        })
        .catch((e) => console.log(JSON.stringify(e, undefined,2)));

    
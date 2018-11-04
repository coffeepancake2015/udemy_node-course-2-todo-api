const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

//  10 is the round of generating salt
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password,salt, (err,hash) => {
        console.log(hash);
    });
});

var hashedPassword = '$2a$10$wEJLUYWhVpulhtTnX74r8OxKpt2jQiaDdcV4y7NLKAbBZSQmco8qq';

bcrypt.compare('123', hashedPassword, (err, res) => {
    console.log(res);
});
//  JWT testing
// var secret = '123abc';
// var data = {
//     id:10
// };
// var token = jwt.sign(data,secret);
// console.log(token);
// var decoded = jwt.verify(token, secret);
// console.log('decoded', decoded);


//  SHA256 hash testing
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`)
// console.log(`Hash: ${hash}`)

// var data = {
//     id:4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data + 'somesecret')).toString()
// };

// var resultHash = SHA256(JSON.stringify(token.data+'somesecret')).toString();

// if(resultHash === token.hash){
//     console.log('Data was not changed');
// }
// else{
//     console.log('Data was changed');
// }
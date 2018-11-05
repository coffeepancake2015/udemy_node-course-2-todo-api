var env = process.env.NODE_ENV || 'development';

console.log('Environment *******', env);

 if(env === 'development' || env === 'test'){
    var config = require('./config.json');
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
        console.log(process.env[key]);
    });
    
 }

// if(env==='production'){
//     console.log('setting up prod environment');
//     process.env.MONGODB_URI = 'mongodb+srv://sucker:sucker@cluster0-ptkdz.mongodb.net/TodoApp?retryWrites=true';
// } 
// else if(env === 'test'){
//     console.log('setting up test environment');
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoAppTest';
//     //process.env.MONGODB_URI = 'mongodb+srv://sucker:sucker@cluster0-ptkdz.mongodb.net/TodoAppTest?retryWrites=true';
// }
// //else if(env === 'development'){
// else{
//     console.log('setting up dev environment');
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoApp';
// }
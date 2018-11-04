var env = process.env.NODE_ENV || 'development';

console.log('env *******', env);

if(env === 'development'){
    console.log('setting up dev environment');
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoApp';
}else if(env === 'test'){
    console.log('setting up test environment');
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoAppTest';
}
else{
    console.log('setting up prod environment');
    process.env.MONGODB_URI = 'mongodb+srv://sucker:sucker@cluster0-ptkdz.mongodb.net/TodoApp?retryWrites=true';
}

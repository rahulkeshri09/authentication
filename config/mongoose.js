const mongoose=require('mongoose');
//connect to db
mongoose.connect('mongodb://localhost/projAuth_development');
//acquire the connection (to check if it is succesful)
const db=mongoose.connection;
db.on('error',console.error.bind(console,"errir in connecting to db"));
//up and running then print the message
db.once('open',function(){
    console.log('connected to database:: mongoDB');
});
module.exports=db;
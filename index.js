const express=require('express');
// fire up the express thorough app
const app=express();  
const port=8000;
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const cookieParser=require('cookie-parser');
const flash=require('connect-flash');
const customMware=require('./config/middleware');
const MongoStore=require('connect-mongo')(session);
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('assets'));
// set ejs as view engine
app.set('view engine','ejs');
app.set('views','./views');
app.use(session({
    name:'authentication-Project',
    secret:'something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },function(err){
            console.log(err || 'connect=mongodb setup okk');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes'));
// start the server
app.listen(port,function(err){
    if(err){
        connsole.log('Error :',err);
    }
    console.log('server is running on port :',port);
});
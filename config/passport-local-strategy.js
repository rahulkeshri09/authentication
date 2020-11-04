const passport=require('passport');
const LocalStratgy=require('passport-local').Strategy;
const User=require('../models/user');
//authentication using passport 
const bcrypt=require('bcrypt');
passport.use(new LocalStratgy({
        usernameField:'email',
        passReqToCallback:true
    },function(req,email,password,done){
        User.findOne({email:email},function(err,user){
                if(err){
                    req.flash('error',err);
                    console.log('error in find the user -->passport');
                    return done(err);
                }
                if(!user){
                    req.flash('success','Invalid username or password');
                    console.log('Invalid username/password');
                    return done(null,false);
                }
                if(user){
                    bcrypt.compare(password , user.password, function (err, result) {
                        console.log("com =",user.password===password);
                        if (result===false) {
                          req.flash('success','Invalid username or password');
                          return done(null, false);
                        }else{
                            req.flash('success','Logged In');
                            return done(null,user);
                        }
                      });
                }
            })
        }
));
//serilizing user function
passport.serializeUser(function(user,done){
    return done(null,user.id);
});
// deserialize
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding the user --> passport');
            return done(err);
        }
        return done(null,user);
    });
});
//check if user is authenticated
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;
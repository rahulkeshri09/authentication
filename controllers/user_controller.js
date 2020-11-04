const User=require('../models/user');
const bcrypt=require('bcrypt');
module.exports.profile=function(req,res){
    return res.render('profile');
}
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    console.log("inside sign up");
    if(req.body.password != req.body.confirm_password){
        console.log("inside check confirm pwd");
        req.flash('success','password not matched');
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        console.log("inside creating signup");
        if(err){
            req.flash('error',err);
            console.log('error in finding user in signing up ');
            return;
        }
        if(!user){
            bcrypt.hash(req.body.password, 10, function (err, hash,next) {
                if (err) {
                    console.log("error bcrypt");
                  return ;
                 }
                req.body.password=hash;
                User.create(req.body,function(err,user){
                    if(err){
                        console.log('error occuur in creating User');
                        return;
                    }
            });
              });
        }
        req.flash('success','user id created');
        return res.redirect('/');
    });
}
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('home',{
                title:"Home"
            });
}
module.exports.createSession=function(req,res){
    return res.redirect('/user/profile');
}
module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','Log out successfull');
    return res.redirect('/');
}
module.exports.resetPwd=function(req,res){
    bcrypt.compare(req.body.old , req.user.password, function (err, result) {
        if (result===false) {
            console.log("wrong passwod")
            req.flash('success','old password is wrong');
          return res.redirect('back')
        }else{
            console.log("password changed");

            bcrypt.hash(req.body.new, 10, function (err, hash,next) {
                if (err) {
                    console.log("error bcrypt");
                  return res.redirect('back');
                 }
                req.body.new=hash;
                User.findByIdAndUpdate(req.user._id,{password:req.body.new},function(err,user){
                    if(err){
                        console.log("error in changing password");
                    }
                    req.flash('success','successfully changed password');
                    return res.redirect('back');
                })
              });

            
        }
      });
}
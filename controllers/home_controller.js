module.exports.home=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('home',{
        title:"Home"
    });
}
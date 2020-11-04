const express=require('express');
const router=express.Router();
const userController=require('../controllers/user_controller');
const passport=require('passport');
router.get('/profile',passport.checkAuthentication,userController.profile);
router.post('/signup',userController.signup);
router.post('/signin',userController.signin);
router.get('/destroy-session',userController.destroySession)
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/'}),
    userController.createSession);
router.post('/reset-pwd',passport.checkAuthentication,userController.resetPwd);
module.exports=router;
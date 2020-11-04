const express=require('express');
const router=express.Router();
//fetch homeController actions
const homeController=require('../controllers/home_controller');
router.get('/',homeController.home);
router.use('/user',require('./users'));

module.exports=router;
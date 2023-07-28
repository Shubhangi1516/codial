const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
const app=express();
console.log('router loaded');

router.get('/',homeController.home);
router.use('/users',require('./users'));
//app.use('/posts',require('./posts'));

router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

module.exports=router;
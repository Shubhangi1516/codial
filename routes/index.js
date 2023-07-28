const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
const app=express();
console.log('router loaded');

//first of all home page will be visible,so all posts and comments need to be populated in homecontroller
router.get('/',homeController.home);
router.use('/users',require('./users'));
//app.use('/posts',require('./posts'));

router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

module.exports=router;
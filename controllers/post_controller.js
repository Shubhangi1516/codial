const Post=require('../models/post');

/*
module.exports.create= async function(req,res){
      await Post.create({
        content: req.body.content,  //save the content in db
        user:req.user._id           //save the uniue user id in db
      }).then(function(Post){
         if(!Post){
            console.log("post not created");
         }
      }).catch(function(err){
         console.log("error in creating post");
      })
}*/


module.exports.create=function(req,res){
    Post.create({
        content: req.body.content,  //save the content in db
        user:req.user._id           //save the uniue user id in db
    },function(err,post){
        if(err){
            console.log('error in creating post');
            return;
        }
        return res.redirect('back');
    })
}
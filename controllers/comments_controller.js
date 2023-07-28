
const Comment=require('../models/comment');
const Post=require('../models/post');


module.exports.create=function(req,res){
    //req.body.post cuz in the comment form, name of post._id is post
     Post.findById(req.body.post, function(err,post){
         if(post){  //if post exists by id, create comment
            Comment.create({        //"Comment is db schema"
                content: req.body.content,
                post: req.body.post,
                user:req.user._id
            },function(err,comment){  //"comment here iscomment by user"
                //handleerror
                
                //update// "comments" is the array of comment in the post schema
                post.comments.push(comment);
                //after updat, save is called
                post.save();

                res.redirect('/');
            });
         }
     });
}


const Comment=require('../models/comment');
const Post=require('../models/post');


/*
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
}*/

//async-await way:
module.exports.create=async function(req,res){
    try{
        let post= await Post.findById(req.body.post);
        if(post){
            let comment=await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });

            post.comments.push(comment);
            post.save();

            res.redirect('/');
        }
    }catch(err){
        console.log('Error',err);
        return;
    }
}


/*
module.exports.destroy=function(req,res){
    Comment.findById(req.params.id, function(err,comment){
        if(comment.user=req.user.id){
             
            let postId=comment.post;
            comment.remove();
            //                               this pulls the id matching with comment id
            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}},function(err,post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}*/


module.exports.destroy=async function(req,res){
    try{
        let comment=await Comment.findById(req.params.id);

        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();
            let post=Post.findByIdAndUpdate(postId,{ $pull: {comments: req.params.id}});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('Error',err);
        return;
    }
}

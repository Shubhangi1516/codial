const Post=require('../models/post');
const Comment=require('../models/comment');
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

/*
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
}*/

//async-await way:
module.exports.create=async function(req,res){
    try{
        let post=await Post.create({
            content: req.body.content,  //save the content in db
            user:req.user._id           //save the uniue user id in db
        });
        
        //check if request is AJAX req ie. xhr 
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post created!"
            });
        }


        req.flash('success','Post published!');
        return res.redirect('back');

    }catch(err){
        console.log('Error',err);
    }
}


/*
module.exports.destroy=function(req,res){
    Post.findById(req.params.id, function(err,post){
          //only the person who created the post should be able to delete it
        //post has a key 'user' which is actiually user id and req.user.id will also give id(in string format)
        if(post.user==req.user.id){
                post.remove();
        //also delete comments in that post
                Comment.deleteMany({post:req.params.id},function(err){
                    return res.redirect('back');
                });
        }
        else{
            return res.redirect('back');
        }
    })
}*/

module.exports.destroy=async function(req,res){
    try{

       let post= await Post.findById(req.params.id);

       if(post.user==req.user.id){
           post.remove();
           //also delete comments in that post
           await Comment.deleteMany({post:req.params.id});

           if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:"post deleted"
            });
           }
            
           req.flash('success','Post and associated comments deleted');
           return res.redirect('back');
           }
         else{
            return res.redirect('back');
         }
    }catch(err){
        console.log('Error',err);
        return;
    }
}
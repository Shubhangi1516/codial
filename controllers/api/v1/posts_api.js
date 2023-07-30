/*
module.exports.index=function(req,res){
    return res.json(200,{
        message:"List of posts",
        posts:[]
    })
}*/

const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

//this is same as create function
module.exports.index=async function(req,res){
    let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
          
        //api returns data in json format
        return res.json(200,{
            message:"list of posts",
            posts:posts
        })
}

module.exports.destroy=async function(req,res){
    try{
        let post= await Post.findById(req.params.id);

        if(post.user==req.user.id){
            post.remove();
            //also delete comments in that post
            await Comment.deleteMany({post:req.params.id});
 
           return res.json(200,{
            message:"post and comm deleted"
           });
        }
          else{
             return res.json(401,{
                message:"you cant del this post"
             });
          }
    }catch(err){
          console.log('*********',err);
          return res.json(500,{
            message:"Internal ServerError"
          });
      }
    }
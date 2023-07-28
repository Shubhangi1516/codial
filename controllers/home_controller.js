const Post=require('../models/post');  //post.js schema



module.exports.home=function(req,res){
     /*
    //return res.end('<h1>Express is up for codial!</h1>');
    Post.find({},function(err,posts){
        return res.render('home',{    
            title:"Codeial| Home",
            posts: posts       //these posts will be shown in home view
        });
    })*/

    //populating the user ofeach post
    Post.find({})   //"Post" stores  post.js schema by requiring it
    .populate('user')
    .populate({
        path:'comments',  //comments is the array in post schema
        populate:{
            path:'user'   //user is another key in post.js schema
        }
    })
    .exec(function(err,posts){
    return res.render('home',{    
        title:"Codeial| Home",
        posts: posts       //these posts will be shown in home view
    });
})

}
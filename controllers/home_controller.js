const Post=require('../models/post');  //post.js schema
const User=require('../models/user');


/*
//homepage will show all the posts and comments
module.exports.home=function(req,res){
     /*
    //return res.end('<h1>Express is up for codial!</h1>');
    Post.find({},function(err,posts){
        return res.render('home',{    
            title:"Codeial| Home",
            posts: posts       //these posts will be shown in home view
        });
    })*/
    
    /*
    //populating the user ofeach post
    Post.find({})   //"Post" stores  post.js schema by requiring it
    .populate('user')
    .populate({
        path:'comments',  //comments is the array in post schema
        populate:{        //nested populate : 
            path:'user'   //user is another key in post.js schema //populates the user who has made the comment
        }
    })
    .exec(function(err,posts){
        //find all users in home page then show
        User.find({},function(err,users){
            return res.render('home',{    
                title:"Codeial| Home",
                posts: posts ,      //these posts will be shown in home view
                all_users:users
            });
        });
        
})

}
*/

//Async-await approach:

module.exports.home=async function(req,res){
    try{
        //populate the user of each post
        let posts=await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
        
        let users=await User.find({});

        return res.render('home',{
            title:"Codeial | Home",
            posts: posts,
            all_users: users
        });
    } catch(err){
        console.log('Error..',err);
        return;
    }
}
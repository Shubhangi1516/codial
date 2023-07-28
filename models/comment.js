//we arecreating comment object separately because if we made an array ofcomment in the post, then we wouldnt figure out which user has made which comment

const mongoose=require('mongoose');


const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },

    //comments belong to a user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},{
    timestamps:true
});

const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;


const mongoose=require('mongoose');


const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //include the array of ids of all comments in thispost schema itself
    comments:[
         {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Comment'
         }
       ]
},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);   //makes a database named "Post" with the schema "postSchema"
module.exports=Post;                            //export this database so it can be required by other folder
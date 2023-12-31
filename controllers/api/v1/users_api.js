const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createSession=async function(req,res){
    
    try{
        let user=await User.findOne({email:req.body.email});

       if(!User || user.password != req.body.password){
          return res.json(422,{
             messgae:"Invalid username or password" 
          });
       }

       return res.json(200,{
         message:"Sign in successful,here's your token,please keep it safe",
         data:{
            token:jwt.sign(user.toJSON(),'codial',{expiresIn:'100000'})
        }
       })
    }catch(err){
       console.log('*****',err);
       return res.json(500,{
        message:"Internal Server Error"
       });
    }
}
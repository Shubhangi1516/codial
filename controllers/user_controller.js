const User=require('../models/user');
const fs=require('fs');
const path=require('path');

module.exports.profile=function(req,res){
    //res.end('<h1> User Profile</h1>');
    //we are sending the "id" in profile route,hence it can be used here
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"User Profile",
            profile_user: user
        });
    });
    
    /*  //Manual authentication
    if(req.cookies.user_id){
           User.findById(req.cookies.user_id,function(err,user){
            if(user){
            return res.render('user_profile',{
                title:"user profile",
                user:user                  //particular user info is sent back on the basis of cookies of that user_id
            })
            }
            return res.redirect('/users/sign-in');
           });
    }
    else{
        return res.redirect('/users/sign-in');
    }*/

}

//render the sign up page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"Codial | Sign up"
    })
}

//render the sign in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    })
}

//get the sign up data
module.exports.create=function (req,res) {
       if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
       }
    
       User.findOne({email: req.body.email},function(err,user){
           if(err){
            console.log('error in finding user in signing up');
            return;
           }

           if(!user){
              User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
              })
           }
           else{
               return res.redirect('back');
           }
       })

}

/*
 //Manual authentication via cookies 
//sign in and create a session for the user
module.exports.createSession=function(req,res){
    //steps to authenticate
     //find the user
     User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing in');return;}

        //handle user found

        if(user){
            //handle passwor whih doesnt match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //handle sessin creation
            res.cookie('user_id',user.id);  //sends user_id as unique cookie for authentication
            return res.redirect('/users/profile');
        }
        else{
            //handle user not found
            return res.redirect('back');
        }
     })

}*/


//sign in and create a session for the user
module.exports.createSession=function(req,res){
    //this is in req,we need to send it to response, so we'll create custom middleware for it in middleware.js
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}


module.exports.destroySession=function(req,res){
    /*
    req.logout();
    return res.redirect('/');*/
    req.logout(function(err) {
        if (err) { console.log('error while signing out'); return; }
        res.redirect('/');
      });
}


module.exports.update= async function(req,res){
    /*
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }*/

    if(req.user.id==req.params.id){
        try{
             let user=await User.findById(req.params.id);
             User.uploadedAvatar(req,res,function(err){
                 if(err){
                    console.log('****Multer error: ',err);
                 }
                 console.log(req.file);

                 user.name=req.body.name;
                 user.email=req.body.email;

                 if(req.file){
                     if(user.avatar){
                          fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                     }


                    //saving the path og uploaded file into the avatar field in the user
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                 }
                 user.save();
                 return res.redirect('back');
             })
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}

const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

//authenticate using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(email,password,done){   //email andp password are automatcally passed in this func
      //find a user and establish the identity
      User.findOne({email:email},function(err,user){
          if(err){
            console.log('Error in finding user-->passport');
            return done(err);
          }

          if(!user || user.password != password){
            console.log('Invalid username/pssword');
            return done(null,false);
          }

          return done(null,user);   //if user is found, it will retun the user to serializer

      });
  }

));


//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    //decides which property should be send as cookie
    done(null,user.id);    //stores the user id in session-cookie which is encrypted in the middleware
});

//deserialize the user from the key in the cookies i.e find which user has logged in
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding user--->passport');
            return done(err);
        }

        return done(null,user);
    });
});

//checks if the user is authenticated
passport.checkAuthentication=function(req,res,next){
      //if user is signed in, pass on the request to next function i.e. controllers action
       if(req.isAuthenticated()){
        return next();
       }

       //if the user is not signed in
       return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending tthis to the locals for the views
        res.locals.user=req.user;
    }

    next();
}


module.exports=passport;
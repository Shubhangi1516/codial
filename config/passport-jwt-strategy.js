const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;  //extracts header from JWT

const User=require('../models/user');

//options to be sent to make jwt
let opts={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey:'codial'
}

passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    
    //extract the id from jwt and check if that user id exists
    User.findById(jwtPayload._id,function(err,user){
        if(err){
            console.log('Error in finding user from JWT');
            return;
        }

        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}));

module.exports=passport;
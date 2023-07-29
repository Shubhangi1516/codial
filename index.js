const express=require('express');
const cookieParser=require('cookie-parser');

const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//use for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');

const flash=require('connect-flash');
const customMware=require('./config/middleware');

/*
const sassMiddleware=require('sass');

app.use(sassMiddleware({
    src:'/assests/scss',
    dest: '/assests/css',
    debug: true,
    outputStyle:'extended',
    prefix:'/css'
}));*/


app.use(express.urlencoded());

/*
//for manual-auth
app.use(cookieParser());*/

app.use(express.static('./assests'));
//make the upload's path avl to browser
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine','ejs');
app.set('views','./views');

//creates the session cookie
//mongo store s used to store the session cookie in the db
app.use(session({
    name:'codeial',
    //TODO chnage the secret before deployment
    secret:'blahsomething',   //this key is used to encrypt
    saveUninitialized:false,  //when session is not initialized i.e. user hs not logged in, dont save extra info
    resave:false,            //when identity is estb, don't save info again and agin
    cookie:{
        maxAge:(1000*60*100)    //time before the session expires
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://127.0.0.1/codeial_development',
            autoRemove:'disabled'
          },
          function(err){
            console.log(err || 'connect-mongodb setup ok');
          }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log('error',err);
        //or 
        console.log(`error in running the server : ${err}`);
    }

    console.log(`Server is running on port: ${port}`);

});
const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1/codeial_development');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting t MongoDB"));

db.once('open',function(){
    console.log('connected to database:: MongoDB');
});

module.exports=db;
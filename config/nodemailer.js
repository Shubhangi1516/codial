const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');


//this decides how mail will be sent
let transporter=nodemailer.createTransport({
    service: 'gmail',
    host:'smtp.gmail.com',
    port:507,
    secure:false,
    auth:{
        user:'shubhangishree25@gmail.com',
        pass:'sdvbdlluyolahsux'
    },
    tls: {
        rejectUnauthorized: false
    }
});

let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering template');
                return;
            }
            mailHTML=template;
        }
    )
    return mailHTML;
}

//export both the above functions
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}
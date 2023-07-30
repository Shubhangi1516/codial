const nodemailer=require('../config/nodemailer');

//another way of exporting a method
exports.newComment=(comment)=>{
    console.log('inside newComment mailer');
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comments.ejs');

    nodemailer.transporter.sendMail({
        from:'shubhangishree25@gmail.com',
        to:comment.user.email,
        subject:"New Comment Published!",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }

        console.log('message sent',info);
        return;
    });
}


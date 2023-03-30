const nodemailer = require('../config/nodemailer');

// thid id anather way of exporting a method
exports.newComment = (comment) =>{
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: '',
        to: comment.user.email,
        subject: "New Comment Published!",
        html: htmlString
    }, (err, info) =>{
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        // console.log('Mesage sent', info);
        return;
    });
}

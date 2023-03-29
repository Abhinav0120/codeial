const nodemailer = require('../config/nodemailer');

// thid id anather way of exporting a method
exports.newComment = (comment) =>{
    console.log('inside newComment mailer');

    nodemailer.transporter.sendMail({
        from: 'psone.artworks@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published!",
        html: '<h1>Yup, your comment is now published!</h1>'
    }, (err, info) =>{
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Mesage sent', info);
        return;
    });
}

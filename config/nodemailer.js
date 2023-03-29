const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');
const { error } = require("console");


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: '587',
    secure: 'false',
    auth: {
        user: '', //Add your Email Id
        pass: '' //Add your Email Id's password
    }
});

let renderTemplate = (data, relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){console.log('error in rendering template', err); return}
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
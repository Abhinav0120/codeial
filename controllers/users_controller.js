const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.render('user_profile',{
        title: "user_profile",
    });
}

// render sing uo page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title: "Codeal | Sing Up"
    });
}

// render sing in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in',{
        title: "Codeal | Sing in"
    });
}

// get  the sing up data
module.exports.create = function(req,res){
   if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
   }

   User.findOne({ email: req.body.email })
    .then((user) => {
        if (!user) {
        return User.create(req.body);
        }
        return Promise.reject('User already exists'); // Reject the Promise if user exists
    })
    .then((user) => {
        return res.redirect('/users/sign-in');
    })
    .catch((err) => {
        console.log('Error:', err);
        return res.redirect('back');
    });

    
}
 
// sign in and create a session for the user
module.exports.createSession = function(req,res){
    // todo later
} 
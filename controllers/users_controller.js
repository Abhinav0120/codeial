const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id)
    .then(user =>{
        return res.render('user_profile',{
            title: "user_profile",
            profile_user: user
        });
    }).catch(err =>{
        console.log(err);x
    });
    
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body)
        .then(user =>{
            if(user){
                return res.redirect('/');
            }
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}

// render sing up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: "Codeal | Sing Up"
    });
}

// render sing in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');   
} 

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) {
            console.log('Error in logging out:', err);
            return next(err);
        }
        req.flash('success', 'You have logged out!');
        return res.redirect('/');
    });
}

const User = require('../models/user');

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id)
        .then((user) =>{
            if(user){
                return res.render('user_profile',{
                    title: "user_profile",
                    user: user
                });
            }else{
                return res.redirect('/users/sign-in');
            }
        })
        .catch((err) =>{
            console.log("Error:", err);
            return res.redirect('back');
        });

    }else{
        return res.redirect('/users/sign-in');
    }    
}

// render sing uo page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title: "Codeal | Sing Up"
    });
}

// render sing in page
module.exports.signIn = function(req, res){
    if(req.cookies.user_id)
    {
        return res.redirect('/users/profile')
    }else{
        return res.render('user_sign_in',{
            title: "Codeal | Sing in"
        });
    }
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
    // steps to authenticate
    // find the user 
    User.findOne({email: req.body.email})
    .then((user) =>{
        // handle user found
        if(user){
            // handle password which don't match
            if(user.password != req.body.password)
            {
                return res.redirect('back');
            }
            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }else{
            // handle user not found
            return res.redirect('back');
        }
    })
    .catch((err) =>{
        console.log('Error:', err);
        return res.redirect('back');
    });
    
} 

// sing-out

module.exports.signOut = function(req,res){
    // res.clearCookie('user_id'); // removes cookie from response header
    res.cookie('user_id', '', { expires: new Date(0) }); // completely removes cokie from the browser
    res.redirect('/users/sign-in');
}
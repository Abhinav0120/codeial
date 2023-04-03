const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const Friendship = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id)
    .populate('friendships')
    .then(user =>{
        let isFriend = false;
        if(req.user){
            const friendIds = user.friendships.map(f => f.to_user._id.equals(user._id) ? f.from_user : f.to_user);
            isFriend = friendIds.some(friendId => friendId.equals(req.user._id));
        }
        return res.render('user_profile',{
            title: "user_profile",  
            profile_user: user,
            isFriend: isFriend
        });
    }).catch(err =>{
        console.log(err);
    });
    
}

module.exports.update = async function(req, res){
    
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('*****Multiple Error: ', err)
                }

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    // this is saving the path of the uploading file into hte avatar fiels in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
                  
            });

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
    }else{
        req.flash('error', 'Unauthorized!');
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

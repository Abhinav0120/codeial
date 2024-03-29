const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
const Friendship = require('../models/friendship');

// authentication using passport
passport.use(new LocalStrategy ({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done){
        
        User.findOne({email: email})
        .then((user) =>{
            if(!user || user.password != password){
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        }).catch((err) => {
            req.flash('error', err);
            return done(err);
        });
    }
));

// serializing the user to decide which key is to kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookies
 passport.deserializeUser(function(id, done){
    
    User.findById(id)
    .then((user) => {
        return done(null, user);
    }).catch((err) =>{
        console.log('Error in finding user ---> Passport');
        return done(err);
    });
 });

//  check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is singed in then pass on the request to the next function(controller's action)
     if(req.isAuthenticated()){
        return next();
     }

    //  if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie 
        // and we are just sending this to the locals for the view  
        User.findById(req.user.id)
        .populate('friendships')
        .then(user => {
            res.locals.user = user;
            // console.log('user:',res.locals.user);
            next();
        })
        .catch(err => {
            console.log('Error in populating user friendship:', err);
            next(err);
        });
    }else{
        next();
    }

    
}
 
module.export = passport;

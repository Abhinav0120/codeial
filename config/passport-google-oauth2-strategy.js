const passport = require('passport');
const googleStratergy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

// tell passport to use new stratergy for google login
passport.use(new googleStratergy({
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_call_back_url
    },

    function(accessToken, refreshToken, profile, done){
        //find  a user
        User.findOne({email: profile.emails[0].value})
        .then(user =>{
            console.log(accessToken, refreshToken);
            console.log(profile);

            if(user){
                // if  user found set this user as req.user
                return done(null, user);
            }else{
                // if not found create the user and set is as req.user
                return User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }).then(user =>{
                    return done(null, user);
                });
            }
        })
        .catch(err =>{
            console.log('error in google stratergy-passport', err);
            return done(err);
        });
    }

));

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
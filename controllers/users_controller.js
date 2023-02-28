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
    // ToDo later
}
 
// sign in and create a session for the user
module.exports.createSession = function(req,res){
    // todo later
} 
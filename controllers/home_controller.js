const Post = require('../models/post');

module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // });

    // Post.find({})
    // .then((posts) =>{
    //     return res.render('home',{
    //         title: "Codeial | Home",
    //         posts: posts
    //     });   
    // });

    // Populate the user of each posts
    Post.find({}).populate('user').exec()
    .then((posts) =>{
        return res.render('home',{
            title: "Codeial | Home",
            posts: posts
        });
    });


}
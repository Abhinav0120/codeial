const Post = require('../models/post');

module.exports.create = function(req, res){
    // res.end('<h1>Users Posts</h1>')
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(post =>{
        console.log('post created:', post);
        return res.redirect('back');
    })
    .catch(err => {
        console.log('error in creating a post:', err);
        return res.redirect('back');
    });
}
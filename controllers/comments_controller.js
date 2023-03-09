const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post).then(post =>{
        if(post){
            Comment.create({
               content: req.body.content,
               post: req.body.post,
               user: req.user._id 
            }).then(comment =>{
                post.comments.push(comment);
                post.save();

                res.redirect('/')
            }).catch(err =>{
                console.log('Error in creating comment:', err)
                return res.redirect('back');
            });
        }
    })
    .catch(err =>{
        console.log('Error in finding post:', err);
        return res.redirect('back');
    });
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id)
    .populate('post')
    .then(comment =>{
        if(comment.user == req.user.id || comment.post.user == req.user.id){
            let postId = comment.post._id;

            comment.deleteOne();

            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}})
            .then(post =>{
                return res.redirect('back');
            })
        }else{
            console.log('User is not Allowed to delete this comment');
            return res.redirect('back');
        }
    })
    .catch(err =>{
        console.log('Error Finding comment:', err);
        return res.redirect('back');
    });
}

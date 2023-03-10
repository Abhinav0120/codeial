const Comment = require('../models/comment');
const Post = require('../models/post');

//converted cod to async await 
module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id 
            });
            post.comments.push(comment);
            post.save();

            res.redirect('/');
        }
    }catch(err){
        console.log('Error:', err);
        return res.redirect('back');
    }
    
}

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id)
        .populate('post');
        if(comment.user == req.user.id || comment.post.user == req.user.id){
            let postId = comment.post._id;

            comment.deleteOne();

            let post = await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
            return res.redirect('back');
        }else{
            console.log('User is not Allowed to delete this comment');
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error:', err);
        return res.redirect('back');
    }
}

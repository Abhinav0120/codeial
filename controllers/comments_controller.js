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

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                })
            }
    

            req.flash('success', 'Commented on the post!');
            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);

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
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id: req.params.id
                    },
                    message: "Comment deleted"
                })
            }

            req.flash('success', 'Comment deleted Successfully!');
            return res.redirect('back');
        }else{
            req.flash('error', 'You are not allowed to delete this comment!');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

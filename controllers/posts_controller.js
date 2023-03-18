const Post = require('../models/post');
const Comment = require('../models/comment');


// converted code to async await 
module.exports.create = async function(req, res){
    // res.end('<h1>Users Posts</h1>')
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            
            // post = await post.populate('user', 'name').execPopulate(); is not working
            post = await post.populate('user', 'name');
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post published! ');
        return res.redirect('back');
    }
    catch(err) {
        req.flash('err', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        //.id means converting the objects _id into string
        if(post.user == req.user.id){
            // here remove() method is not working but deleteOne() works
            post.deleteOne();
            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                })
            }

            req.flash('success', 'Post and asoociated comments deleted!');
            return res.redirect('back'); 
        }else{
            req.flash('err', 'You can not delete this post!');
            return res.redirect('back');
        }
    }
    catch(err){ 
        req.flash('err', err);
        return res.redirect('back');
    }
}

 // written because remove() method is not working
// module.exports.destroy = function(req, res){
//     Post.findByIdAndDelete(req.params.id)
//     .then(post =>{
//         //.id means converting the objects _id into string
//         if(post.user == req.user.id){
//             Comment.deleteMany({post: req.params.id})
//             .then(() => {
//                 return res.redirect('back');
//             })
//             .catch(err =>{
//                 console.log('Error in deleting comments:', err);
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     })
//     .catch(err =>{ 
//         console.log('Error Finding the post to delete:', err);
//         return res.redirect('back');
//     });
// }

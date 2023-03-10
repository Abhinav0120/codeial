const Post = require('../models/post');
const Comment = require('../models/comment');
const mongoose = require('mongoose');

// converted code to async await 
module.exports.create = async function(req, res){
    // res.end('<h1>Users Posts</h1>')
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    }
    catch(err) {
        console.log('error in creating a post:', err);
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
            return res.redirect('back'); 
        }else{
            return res.redirect('back');
        }
    }
    catch(err){ 
        console.log('Error:', err);
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

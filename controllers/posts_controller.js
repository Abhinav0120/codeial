const Post = require('../models/post');
const Comment = require('../models/comment');
const mongoose = require('mongoose');


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

module.exports.destroy = function(req, res){
    Post.findById(req.params.id)
    .then(post =>{
        //.id means converting the objects _id into string
        if(post.user == req.user.id){
            // here remove() method is not working but deleteOne() works
            return post.deleteOne().then(() => {
                return Comment.deleteMany({post: req.params.id});
            }).then(() => {
                return res.redirect('back');
            }).catch(err =>{
                console.log('Error in deleting comments:', err);
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    })
    .catch(err =>{ 
        console.log('Error Finding the post to delete:', err);
    });
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

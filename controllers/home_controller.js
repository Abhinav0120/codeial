const Post = require('../models/post');
const User = require('../models/user');

// module.exports.home = function(req, res){
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     .exec()
//     .then((posts) =>{
//         User.find({})
//         .then(users =>{
//             return res.render('home',{
//                 title: "Codeial | Home",
//                 posts: posts,
//                 all_users: users
//             });
//         });
//     });
// }

// using async and await
module.exports.home = async function(req, res){

    try{
        // populate the user fo each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({});

        return res.render('home',{
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    }catch(err){
        console.log('Error',err);
        return;
    }
    
}
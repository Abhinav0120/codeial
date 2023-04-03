const Post = require('../models/post');
const User = require('../models/user');
const Friendship = require('../models/friendship');

// using async and await
module.exports.home = async function(req, res){

    try{
        // populate the user fo each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: [
                {
                    path: 'user',
                },
                {
                    path: 'likes'
                }
            ]
        })
        .populate('likes');

        posts.forEach(post => {
            post.comments.sort((a, b) => b.createdAt - a.createdAt);
        });

        let users = await User.find({});

        if(req.user){
            const currentUser = await User.findById(req.user.id).populate({
                path:'friendships',
                populate:{
                    path: 'to_user from_user',
                    select: 'name _id'
                }
            });
            let friends = [];

            if(currentUser.friendships){
                friends = currentUser.friendships.map(friendship => {
                    const friendUser = friendship.to_user._id.equals(currentUser._id) ? friendship.from_user : friendship.to_user;
                    return friendUser;
                });
            }
            
            console.log(friends);
            return res.render('home',{
                title: "Codeial | Home",
                posts: posts,
                all_users: users,
                all_friends: friends
            });
    
        }else{
            return res.render('home',{
                title: "Codeial | Home",
                posts: posts,
                all_users: users,
            });
        }
        

    }catch(err){
        console.log('Error',err);
        return;
    }
    
}
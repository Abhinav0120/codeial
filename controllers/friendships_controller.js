const Friendship = require('../models/friendship');
const User = require('../models/user');


module.exports.toggleFriendship = async function(req, res){

    try{
        // friendships/toggle/?id=abcdef
        let from_user;
        let to_user;
        let deleted = false;

        if(req.user){
            from_user = await User.findById(req.user._id).populate('friendships');
            to_user = await User.findById(req.params.id).populate('friendships');
    
            // check if friendship already exists
            let existingFriendship = await Friendship.findOne({
                from_user: req.user._id,
                to_user: req.params.id
            });
    
            if(!existingFriendship){
               existingFriendship = await Friendship.findOne({
                    from_user: req.params.id,
                    to_user: req.user._id
               });
            }
    
            // if Friendship already exist delete it
            if(existingFriendship){
                from_user.friendships.pull(existingFriendship._id);
                from_user.save();
                to_user.friendships.pull(existingFriendship._id);
                to_user.save();
    
                existingFriendship.deleteOne();
                // console.log("existingFriendship",existingFriendship);
                // console.log('User Friendships',from_user.friendships);
                deleted = true;
            }else{
                // else make a new friendship
    
                let newFriendship = await Friendship.create({
                    from_user: req.user._id,
                    to_user: req.params.id
                });
    
                from_user.friendships.push(newFriendship._id);
                from_user.save();
                to_user.friendships.push(newFriendship._id);
    
                // console.log("New Friendship",newFriendship);
                // console.log('User Friendships',from_user.friendships);
                to_user.save();
            }
    
            return res.status(200).json({
                message: "Request successfull",
                data: {
                    deleted: deleted
                }
            });
    
        }
       
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}
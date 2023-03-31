const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // the user who sent this request
    from_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // the user who accepts the request, the naming is just to understand, ohterwise, the user's wont't see a difference
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps: true
});

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;
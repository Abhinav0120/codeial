const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    // this defines the object id of the liked Object
    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    // This Field is used for defining the type of the liked object since this is a dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
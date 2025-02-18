const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog'
    },
    comment: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('comment', commentSchema);
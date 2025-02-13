const mongoose = require('mongoose');
const blogSchema = mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('blog', blogSchema);
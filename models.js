const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    text: String,
    author: String,
    date: String,
    comments: [
        {
            text: String,
            date: String
        }
    ]
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
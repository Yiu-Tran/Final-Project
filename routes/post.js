const express = require('express');
const router = express.Router();
const Post = require('../models');

router.get('/contact/:postID', async(req, res) => {
    const post = await Post.findOne({_id: req.params.postID}).lean();
    res.render('contact', {
      post: post, 
      contactSubpage: true
    });
    res.status(200);
  
  });
  
router.post('/addPost', (req, res) => {
    let date = new Date();
    parsedDate = (date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        date: parsedDate,
        comments: [] 
    });
    post.save().then(async() => {
        res.redirect('/contact');
    })
    .catch(e => {
        console.log('Error adding post' + e);
        res.redirect('404');
    });
});
  
router.post('/editPost', (req, res) => {
    const editedPost = {
      title: req.body.title,
      text: req.body.text,
      author: req.body.author
    }
    Post.findOneAndUpdate({_id: req.body.id}, editedPost, {useFindAndModify: false})
    .then(() => {
      res.redirect('/contact');
    })
    .catch(e => {
      console.log('Error updating post' + e);
      res.redirect('404');
    });
});
  
router.post('/deletePost', (req, res) => {
    Post.deleteOne({_id: req.body.id})
    .then(() => {
      res.redirect('/contact');
    })
    .catch(e => {
      console.log('Error updating post' + e);
      res.redirect('404');
    });
});
  
router.post('/contact/:postID', (req, res) => {
    let date = new Date();
    parsedDate = (date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
    const comment = {
      text: req.body.text,
      date: parsedDate
    }
    Post.updateOne({_id: req.params.postID}, {$push: {comments: comment}})
    .then(() => {
      res.redirect(`/contact/${req.params.postID}`);
    })
    .catch(e => {
      console.log('Error adding comment' + e);
      res.redirect('404');
    });
});

module.exports = router;
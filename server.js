const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/post', { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.connection
  .once('open', () => console.log('Connection has been made with mongoDB'))
  .on('error', e => console.log('Connection error with mongoDB: ' + e));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index');
  res.status(200);
});

app.get('/contact', async(req, res) => {
  const posts = await Post.find({}).lean();
  res.render('contact', {forumData: posts, contactHome: true});
  res.status(200);
});

app.get('/contact/:postID', async(req, res) => {
  const post = await Post.findOne({_id: req.params.postID}).lean();
  res.render('contact', {post: post, contactSubpage: true});
  res.status(200);
});

app.post('/addPost', (req, res) => {
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

app.post('/editPost', (req, res) => {
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

app.post('/deletePost', (req, res) => {
  Post.deleteOne({_id: req.body.id})
  .then(() => {
    res.redirect('/contact');
  })
  .catch(e => {
    console.log('Error updating post' + e);
    res.redirect('404');
  });
});

app.post('/contact/:postID', (req, res) => {
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

app.get('/insurance', (req, res) => {
  res.render('insurance');
  res.status(200);
});

app.get('/dentalVision', (req, res) => {
  res.render('dentalVision');
  res.status(200);
});

app.get('/individualReform', (req, res) => {
  res.render('individualReform');
  res.status(200);
});

app.get('/businessReform', (req, res) => {
  res.render('businessReform');
  res.status(200);
});


app.get('/lifeDisability', (req, res) => {
  res.render('lifeDisability');
  res.status(200);
});

app.get('*', (req, res) => {
  res.render('404');
  res.status(404);
});

app.listen(port, () => console.log("== Server is listening on port", port));
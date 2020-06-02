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
  .on('error', (e) => console.log('Connection error with mongoDB: ' + e));

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
  const posts = await Post.find({}).lean()
  res.render('contact', {forumData: posts, contactHome: true});
  res.status(200);
});

// for(let i = 0; i < posts.length; i++) {
//   app.get('/contact/' + posts[i].id, (req, res) => {
//     res.render('contact', {posts: posts[i], contactSubpage: true});
//     res.status(200);
//   });
// }

app.post('/addPost', (req, res) => {
  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    author: req.body.author,
    date: Date()
  });
  post.save().then(async() => {
      const posts = await Post.find({}).lean()
      res.render('contact', {forumData: posts, contactHome: true});
  })
  .catch((e) => {
    console.log('Error saving to MongoDB' + e);
  });
});

app.get('*', (req, res) => {
  res.render('404');
  res.status(404);
});

app.listen(port, () => console.log("== Server is listening on port", port));
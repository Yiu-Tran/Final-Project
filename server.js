const dotenv = require('dotenv');
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const Post = require('./models');
const postRoute = require('./routes/post');

const app = express();
dotenv.config();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(postRoute);

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.connection
  .once('open', () => console.log('Connection has been made with mongoDB'))
  .on('error', e => console.log('Connection error with mongoDB: ' + e));

app.get('/', (req, res) => {
  res.render('index');
  res.status(200);
});

app.get('/contact', async(req, res) => {
  const posts = await Post.find({}).lean();
  res.render('contact', {forumData: posts, contactHome: true});
  res.status(200);
});

app.get('/service', (req, res) => {
  res.render('service');
  res.status(200);
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
app.get('/about', (req, res) => {
  res.render('about');
  res.status(200);
});
app.get('*', (req, res) => {
  res.render('404');
  res.status(404);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("== Server is listening on port", port));
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = process.env.PORT || 3000;

const forumData = require('./forumData.json');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
  res.status(200);
});

app.get('/contact', (req, res) => {
  res.render('contact', {forumData: forumData});
  res.status(200);
});

app.get('*', (req, res) => {
  res.render('404');
  res.status(404);
});

app.listen(port, () => console.log("== Server is listening on port", port));
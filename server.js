const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
  res.status(200);
});

app.get('*', (req, res) => {
  res.render('404');
  res.status(404);
});

app.listen(port, () => console.log("== Server is listening on port", port));

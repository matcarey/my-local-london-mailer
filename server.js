const express = require('express'),
  app = express(),
  exphbs = require('express-handlebars');


app.engine('handlebars', exphbs({
  defaultLayout: 'main', helpers: {}
}));

app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('2016-06-10', {
    categories: [
      '/event/category/health'
    ],
    name: 'Mat'
  });
});

app.listen(process.env.PORT);
const express = require('express'),
  app = express(),
  exphbs = require('express-handlebars'),
  _ = require('lodash');


app.engine('handlebars', exphbs({
  defaultLayout: 'main', helpers: {}
}));

app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  const baseUrl = process.env.MLL_MAILER_MAILER_SERVER,
    webBaseUrl = process.env.MLL_MAILER_WEB_SERVER;
  res.render('2016-06-10', _.extend({}, req.query, {
    baseUrl: baseUrl,
    headerUrl: baseUrl + '/images/header-01.jpg',
    subscribedCategories: [
      {
        title: 'Health',
        showAllLink: webBaseUrl + '/abc',
        events: [
          {
            name: 'Mat',
            description: 'Someone who builds stuff because it\'s fun.'
          }
        ]
      }
    ]
  }));
});

app.use('/images', express.static('images'));

app.listen(process.env.PORT);
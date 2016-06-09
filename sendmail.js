var api_key = process.env.MLL_MAILGUN_API_KEY;
var domain = process.env.MLL_MAILGUN_DOMAIN;
if (!api_key) {
  throw new Error('API Key Requeired');
}
if (!domain) {
  throw new Error('Domain Required');
}
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'serobnic@mail.ru',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!'
};

mailgun.messages().send(data, function (error, body) {
  if (error) {
    console.error(error);
    throw new Error('OMG!', error);
  }
  console.log(body);
});
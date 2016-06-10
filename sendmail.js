const rp = require('request-promise'),
  juice = require('juice'),
  api_key = process.env.MLL_MAILGUN_API_KEY,
  domain = process.env.MLL_MAILGUN_DOMAIN;

if (!api_key) {
  throw new Error('API Key Requeired');
}
if (!domain) {
  throw new Error('Domain Required');
}
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const subject = 'My Local London Update';

rp.get('http://localhost:7811/?name=Mat&subject=' + encodeURIComponent(subject))
  .then(function (originalHtml) {
    var html = juice(originalHtml);
    var data = {
      from: 'My Local London <info@my-local.london>',
      to: 'Mat <mat@matcarey.co.uk>',
      subject: subject,
      html: html
    };
    mailgun.messages().send(data, function (error, body) {
      if (error) {
        console.error(error);
        throw new Error('OMG!', error);
      }
      console.log(body);
    });
  });
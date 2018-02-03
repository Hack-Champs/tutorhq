'use strict';

const nodemailer = require('nodemailer');

let user = '<username>' || process.env.SENDGRID_USER;
let password = '<password>' || process.env.SENDGRID_PASSWORD;

let transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: user,
    pass: password
  }
});

module.exports.sendLink = function(tutorName, email, link) {
  let mailOptions = {
    from: '<company email address>',
    to: email,
    subject: `Your private chat room with ${ tutorName }`,
    html: `<p>Please click on this url <a src=${link}>${link}</a> to access your private chat room with ${ tutorName }</p>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};


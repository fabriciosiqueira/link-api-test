const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
require('dotenv/config')


const transport = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
});


const handlebarOptions = {
  viewEngine: {
    extName: 'handlebars',
    layoutsDir: "./src/resources/mail/", 
    partialsDir: "./src/resources/mail/", 
    defaultLayout: undefined
  },
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html',
};

transport.use('compile', hbs(handlebarOptions));



module.exports = transport;
require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const mailConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
};

// Create the transporter with the required configuration for Gmail
// change the user and pass !
const transporter = nodemailer.createTransport(mailConfig);

function sendMail(mail) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mail, (error, info) => {
      /* eslint-disable no-console */
      if (error) {
        console.log(error);
        reject(false);
      }
      console.log(`Message sent: ${info.response}`);
      /* eslint-enable no-console */
      resolve(true);
    });
  });
}

function createMail(
  name = 'Nie podano',
  mail,
  subject = 'Nie podano',
  message = ''
) {
  return {
    from: `"Hamer " <${process.env.EMAIL_TO_SEND}>`,
    to: process.env.EMAIL_TO_SEND,
    replyTo: mail,
    subject,
    text: message,
    html: message,
  };
}

app.use('/img', express.static('img'));

app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, './styles.css'));
});

app.get('/android-chrome-192x192.png', (req, res) => {
  res.sendFile(path.join(__dirname, './android-chrome-192x192.png'));
});

app.get('/android-chrome-256x256.png', (req, res) => {
  res.sendFile(path.join(__dirname, './/android-chrome-256x256.png'));
});

app.get('/apple-touch-icon.png', (req, res) => {
  res.sendFile(path.join(__dirname, './apple-touch-icon.png'));
});

app.get('/browserconfig.xml', (req, res) => {
  res.sendFile(path.join(__dirname, './browserconfig.xml'));
});

app.get('/favicon-16x16.png', (req, res) => {
  res.sendFile(path.join(__dirname, './favicon-16x16.png'));
});

app.get('/favicon-32x32.png', (req, res) => {
  res.sendFile(path.join(__dirname, './favicon-32x32.png'));
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, './favicon.ico'));
});

app.get('/mstile-150x150.png', (req, res) => {
  res.sendFile(path.join(__dirname, './mstile-150x150.png'));
});

app.get('/safari-pinned-tab.svg', (req, res) => {
  res.sendFile(path.join(__dirname, './safari-pinned-tab.svg'));
});

app.get('/site.webmanifest', (req, res) => {
  res.sendFile(path.join(__dirname, './site.webmanifest'));
});

app.get('/googlef50e0c456b20e1b5.html', (req, res) => {
  res.sendFile(path.join(__dirname, './googlef50e0c456b20e1b5.html'));
});

app.get('/kontakt', (req, res) => {
  res.sendFile(path.join(__dirname, './contact.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/oferta', (req, res) => {
  res.sendFile(path.join(__dirname, './offer.html'));
});

app.get('/o-nas', (req, res) => {
  res.sendFile(path.join(__dirname, './about.html'));
});

app.post('/kontakt', (req, res) => {
  if (req.body.detail) {
    res.sendFile(path.join(__dirname, './failure-contact.html'));
  } else {
    sendMail(
      createMail(
        req.body.name,
        req.body.email,
        req.body.subject,
        req.body.message
      )
    )
      .then(() => res.sendFile(path.join(__dirname, './success-contact.html')))
      .catch(() =>
        res.sendFile(path.join(__dirname, './failure-contact.html'))
      );
  }
});

app.listen(8080, () => {
  console.log('server-started');
});

const nodemailer = require("nodemailer")
const express = require('express');
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}));

const mailConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "lasakmarcin90@gmail.com",
      pass: "passwordhere",
    },
  }

// Create the transporter with the required configuration for Gmail
// change the user and pass !
const transporter = nodemailer.createTransport(mailConfig)

function sendMail(mail) {
  transporter.sendMail(mail, (error, info) => {
    /* eslint-disable no-console */
    if (error) {
      return console.log(error)
    }
    console.log(`Message sent: ${info.response}`)
    /* eslint-enable no-console */
    return true
  })
}

function createMail(name, mail, subject, message) {
  return {
    from: `"Hamer " <${mailConfig.auth.user}>`,
    to: mailConfig.auth.user,
    replyTo: mail,
    subject,
    text: message,
    html: message,
  }
}

app.use("/img", express.static("img"))

app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, './styles.css'));
})

app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname, './contact.html'));
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
})

app.get('/oferta', (req, res) => {
    res.sendFile(path.join(__dirname, './offer.html'));
})

app.get('/o-nas', (req, res) => {
    res.sendFile(path.join(__dirname, './about.html'));
})

app.post('/kontakt', (req, res) => {
    sendMail(createMail(req.body.name, req.body.email, req.body.subject, req.body.message));
    res.sendFile(path.join(__dirname, './contact.html'));
})

app.listen(8080, () => {
    console.log('server-started');
})



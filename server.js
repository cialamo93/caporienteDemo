const express = require('express');
const app = express();
const http = require('http');
const cors = require("cors");
const { MercadoPagoConfig, Payment } = require('mercadopago');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

const port = 4000;

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

const server = http.createServer(app);

const meliClient = new MercadoPagoConfig({ accessToken: 'TEST-7607088986538417-121213-34786fe6cff5243c91cc3f898842a42a-138387612', options: { timeout: 5000 } });
const meliPayment = new Payment(meliClient);


function genTimeID(length) {
  let letters = "abcdefghijklmnopqrstuvwxyz"
  let result = letters.charAt(Math.floor(Math.random() * letters.length))
  let characters =
      "AaBb1CcDdEe2FfGg3HhIi4JjKk5LlMm6NnOoPp7QqRrSs8TtUu9VvWwXx0YyZz"
  let charactersLength = characters.length
  for (let i = 0; i < length; i++) { result += characters.charAt( Math.floor(Math.random() * charactersLength) ) };
  let timeStamp = Date.now().toString()
  result += timeStamp.substr(timeStamp.length - 4)
  return result
}


(async () => {

console.log("Servidor Iniciado a las " + new Date())

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

app.get('/testNode', (req, res) => {
  console.log("Hola " + new Date());
});

app.post('/process_payment', async (req, res) => {
  try {
    let paymentInfo = await meliPayment.create({
      body: req.body
    });
    res.json(paymentInfo.status)
  }
  catch (error) {
    console.log(error);
    res.json("error");
  }
});

app.post('/sendMessage', async (req, res) => {
  try {
    const msg = {
      to: 'calamo@alumnos.uai.cl',
      from: 'support@zellero.com', // Change to your verified sender
      subject: 'El contacto ' + req.body.email + ' te envío un mensaje a través de la página',
      text: req.body.message,
      html: req.body.message,
    };
    let messageSent = await sgMail.send(msg);
    console.log(messageSent)
  }
  catch (error) {
    console.log(error);
    res.json("error");
  }
});


})()


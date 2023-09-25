const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({
    Access_Control_Allow_Origin: "*",
    origin:"*",
    method:['GET','POST','PATCH','DELETE','PUT'],
    allowedHeaders:'Content-Type, Authorization, Origin, X-Requested-With, Accept' }));
    
app.use(bodyParser.json());


app.listen(3000, () => {
  console.log("The server started...");
});


app.get("/", (req, res) => {
  res.send(
    "A text from the server"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  
  let formData = req.body;
  sendMail(formData, info => {
    console.log(`The mail has been sent with message id: ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(details, callback) {
  let transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: "convergenceitsolutions03@gmail.com",
        pass: "epiagizodbnaibdu",
        
        // "kzfyqitzyjqbskyf -> epiagizodbnaibdu"
    }
  });


  let mailOptions = {
    from: details.from, // sender address
    to: details.to, // Receiver
    subject: details.subject, // Subject line
    text: details.text // Message body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

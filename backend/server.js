const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); 
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 8070;

// Middleware for parsing JSON and urlencoded form data
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST endpoint for handling form submissions
app.post('/send-email', (req, res) => {
  const { fname, lname, email, message } = req.body;

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'example@gmail.com', // replace with your Gmail address
      pass: '#######', // replace with your Gmail password
    },
  });

  // Email options
  const mailOptions = {
    from: `${email}`,
    to: "example@gmail.com", // replace with your recipient's email address
    subject: 'Contact Us',
    text: ` Firstname: ${fname}\n Lastname: ${lname}\n Email: ${email}\n Message: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
    console.log('Email sent: ' + info.response);
    res.status(200).send('Email sent successfully');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

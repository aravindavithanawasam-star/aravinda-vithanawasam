'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Admin operations route
app.post('/admin', (req, res) => {
    // Logic for admin operations
    res.send('Admin operation performed');
});

// Product management route
app.post('/products', (req, res) => {
    // Logic for product management
    res.send('Product managed');
});

// Cart checkout route
app.post('/checkout', (req, res) => {
    // Logic for cart checkout
    res.send('Checkout processed');
});

// Email notification route
app.post('/notify', (req, res) => {
    // Logic for sending email notifications
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // replace with your email
            pass: 'your-email-password' // replace with your email password
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: req.body.email,
        subject: 'Notification',
        text: 'This is a notification email.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send(`Email sent: ${info.response}`);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

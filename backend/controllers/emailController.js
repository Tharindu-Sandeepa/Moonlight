const nodemailer = require('nodemailer');


function sendEmail({ recipient_email, OTP }) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD,
            },
        });

        const mailConfigs = {
            from: process.env.MY_EMAIL,
            to: recipient_email,
            subject: 'MOONLIGHT PASSWORD RECOVERY',
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Moonlight OTP Email</title>
                <style>
                    /* Add some basic styles for the email */
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                        color: #333;
                    }
                    .email-container {
                        width: 80%;
                        max-width: 600px;
                        margin: 50px auto;
                        padding: 20px;
                        background-color: white;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        border-bottom: 1px solid #eee;
                        padding-bottom: 10px;
                    }
                    .header a {
                        font-size: 1.4em;
                        color: #0d47a1; /* Dark blue */
                        text-decoration: none;
                        font-weight: 600;
                    }
                    .content {
                        margin-top: 20px;
                        line-height: 1.5;
                    }
                    .otp {
                        display: block;
                        text-align: center;
                        margin: 20px 0;
                        padding: 10px 20px;
                        background-color: #0d47a1; /* Dark blue */
                        color: white;
                        font-size: 1.6em;
                        border-radius: 5px;
                    }
                    .footer {
                        border-top: 1px solid #eee;
                        margin-top: 20px;
                        padding-top: 10px;
                        color: #aaa;
                        font-size: 0.9em;
                    }
                    .footer p {
                        margin: 5px 0;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <a href="http://www.moonlight.lk">Moonlight</a>
                    </div>
                    <div class="content">
                        <p>Hi,</p>
                        <p>Thank you for choosing Moonlight. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes.</p>
                        <h2 class="otp">${OTP}</h2>
                        <p>Regards,<br>Moonlight Team</p>
                    </div>
                    <div class="footer">
                        <p>Moonlight Inc</p>
                        <p>123 Main Street</p>
                        <p>Sri Lanka</p>
                    </div>
                </div>
            </body>
            </html>
            `,
        };

        transporter.sendMail(mailConfigs, (error, info) => {
            if (error) {
                console.log(error);
                return reject({ message: 'An error occurred' });
            }
            return resolve({ message: 'Email sent successfully' });
        });
    });
}

const sendRecoveryEmail = async (req, res) => {
    try {
        const response = await sendEmail(req.body);
        res.status(200).send(response.message);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

function sendWelcomeEmail({ recipient_email, username }) {
    return new Promise((resolve, reject) => {
        // Create the transporter object with your email service and authentication details
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD,
            },
        });

        // Define the email configurations
        const mailConfigs = {
            from: process.env.MY_EMAIL,
            to: recipient_email,
            subject: 'Welcome to Moonlight!',
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Welcome to Moonlight!</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                        color: #333;
                    }
                    .email-container {
                        width: 80%;
                        max-width: 600px;
                        margin: 50px auto;
                        padding: 20px;
                        background-color: white;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        border-bottom: 1px solid #eee;
                        padding-bottom: 10px;
                    }
                    .header a {
                        font-size: 1.4em;
                        color: #0d47a1; /* Dark blue */
                        text-decoration: none;
                        font-weight: 600;
                    }
                    .content {
                        margin-top: 20px;
                        line-height: 1.5;
                    }
                    .footer {
                        border-top: 1px solid #eee;
                        margin-top: 20px;
                        padding-top: 10px;
                        color: #aaa;
                        font-size: 0.9em;
                    }
                    .footer p {
                        margin: 5px 0;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <a href="http://www.moonlight.lk">Moonlight</a>
                    </div>
                    <div class="content">
                        <p>Hi ${username},</p>
                        <p>Welcome to Moonlight! Your account has been successfully created. In the event that you do not know your password or have forgotten it, you can establish a new password by utilizing the "Forgot Password" option on the login page. This feature ensures that you maintain secure access to your account. Thank you for choosing Moonlight.</p>
                        <p>Regards,<br>Moonlight.lk</p>
                    </div>
                    <div class="footer">
                        <p>Moonlight Inc</p>
                        <p>Kaluthara</p>
                        <p>Sri Lanka</p>
                    </div>
                </div>
            </body>
            </html>`,
        };

        // Send the email using the transporter and the email configurations
        transporter.sendMail(mailConfigs, (error, info) => {
            if (error) {
                console.log(error);
                return reject({ message: 'An error occurred' });
            }
            return resolve({ message: 'Email sent successfully' });
        });
    });
};

module.exports = {
    sendRecoveryEmail,sendWelcomeEmail
};

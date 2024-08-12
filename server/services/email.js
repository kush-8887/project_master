const nodeMailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (options) => {
    try {
        const transporter = nodeMailer.createTransport({
            service: process.env.service,
            auth: {
                user: process.env.mail,
                pass: process.env.password,
            },
        });

        const mailoptions = {
            from: process.env.mail,
            to: options.to,
            subject: options.subject,
            text: options.text,
        };

        await transporter.sendMail(mailoptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendEmail;

import nodemailer from "nodemailer"
const mailAddress = "webxperts.uz@gmail.com"
// Create a transporter object using SMTP
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
        user: mailAddress,
        pass: 'i312100f'
    }
});
export function SendEmail(email, subject, text) {
    // Setup email data
    let mailOptions = {
        from: `"Sender Name" <${mailAddress}>`,
        to: email,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });

}
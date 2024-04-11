import nodemailer from "nodemailer"
const mailAddress = 'webxperts.uz@internet.ru'
// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: mailAddress,
        pass: 'RaAMZUkqk2XLQkjXcCNp'
    }
});
transporter.verify(function (error, success) {
    if (error) {
        console.log('Ошибка при проверке подключения к SMTP серверу:', error);
    } else {
        console.log('Подключение к SMTP серверу успешно:', success);
    }
});
export function SendEmail(email, subject, text) {
    let mailOptions = {
        from: `Stamina Fitness ${mailAddress}`,
        to: email,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
    console.log(200);
}
import nodemailer from "nodemailer";

const mailAddress = 'webxperts.uz@internet.ru';
const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: mailAddress,
        pass: 'RaAMZUkqk2XLQkjXcCNp'
    }
});

transporter.verify((error, success) => console.log(error ? `Ошибка при проверке подключения к SMTP серверу: ${error}` : `Подключение к SMTP серверу успешно: ${success}`));

export const SendEmail = (email, subject, text) => {
    // const mailOptions = {
    //     from: `Stamina Fitness ${mailAddress}`,
    //     to: email,
    //     subject,
    //     text
    // };

    // transporter.sendMail(mailOptions, (error, info) => error && console.log(error));
    console.log("email is send");
};
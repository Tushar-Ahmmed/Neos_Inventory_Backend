
import nodemailer from "nodemailer";

export const sendEmail = async (Mailto, subject, text, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Using Gmail as the service
        auth: {
          user: 'tushar7425452@gmail.com', // Your Gmail address
          pass: 'ybxkchqrzgnmogqh',  // Your Gmail password (or app password)
        },
    });

    const mailOptions = {
        from: '"Neoscoder" <tushar7425452@gmail.com>', // sender address
        to: Mailto, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
    };
    return await transporter.sendMail(mailOptions);
};

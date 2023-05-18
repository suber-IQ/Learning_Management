import { config } from '@root/config';
import nodeMailer from 'nodemailer';

type EmailOptions = {
    email: string;
    subject: string;
    message: string;
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
    const transporter = nodeMailer.createTransport({
        host: config.SMPT_HOST,
        port: Number(config.SMPT_PORT),
        service: config.SMPT_SERVICE,
        auth: {
          user: config.SMPT_MAIL,
          pass: config.SMPT_PASSWORD,
        },
    });

    const mailOptions = {
        from: config.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;

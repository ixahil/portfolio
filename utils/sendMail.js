import { configDotenv } from "dotenv";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { URL } from "url";

const __dirname = new URL(".", import.meta.url).pathname;

configDotenv();

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || "587",
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { email, subject, template, data } = options;

  // Get the path to the email template file
  const templatePath = path.join(__dirname, "../mails", template);

  console.log(templatePath);

  // Render the Email Template with ejs
  const html = await ejs.renderFile(template, data);

  // Send the email
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;

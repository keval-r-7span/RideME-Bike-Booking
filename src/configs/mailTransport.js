const nodemailer = require("nodemailer");
const { MAIL } = require("../helper/constants");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  service: "gmail",
  port: 2525,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: `kevaltest27@gmail.com`,
    pass: MAIL.PASS,
  },
});

module.exports = transporter;

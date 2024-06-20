const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Atheek ${process.env.EMAIL_FROM}`;
  }

  newTransporter() {
    if (process.env.NODE_ENV == "production") {
      // SENDGRID
      return 1;
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // RENDER HTML

    // DEFINE EMAIL OPTIONS
    const mailOptions = {
      from: "Atheek <hello@atheek.io>",
      to: this.to,
      subject: this.subject,
      text: "options.message",
    };

    // CREATE A TRANSPORT AND CREATE EMAIL
    await this.newTransporter().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("Welcome", "welcome to the blog app");
  }
};

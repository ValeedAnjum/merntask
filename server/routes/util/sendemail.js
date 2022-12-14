const config = require("config");
const nodemailer = require("nodemailer");
const forgotPasswordEmailtemplate = require("./forgotPasswordEmailtemplate");

module.exports.sendEmailToUser = function async(res, password, email) {
  // creating a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.get("email"),
      pass: config.get("pass"),
    },
  });
  // mail data
  const mailData = {
    from: "noreplay@gmail.com",
    to: email,
    subject: "Password",
    html: forgotPasswordEmailtemplate(password),
  };
  //sending email using transporter
  transporter.sendMail(mailData, function (error, info) {
    if (error) {
      console.log(error);
      res.json(error);
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true });
    }
  });
};

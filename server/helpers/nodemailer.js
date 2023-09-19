const nodemailer = require("nodemailer");
const { Customer, Product, CustomerProduct } = require("../models");

async function kirimEmail(email, link) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ninoambaraa@gmail.com",
        pass: "zdcdagdwjatkdjkn",
      },
    });

    const sendEmail = await transporter.sendMail({
      from: "noreply",
      to: email,
      subject: "Email dengan Link PDF",
      text: "Berikut adalah link PDF invoice anda: " + link,
    });

  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = kirimEmail;

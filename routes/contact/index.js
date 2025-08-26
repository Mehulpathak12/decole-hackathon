const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

router.get("/contact", (req, res) => {
  res.render("contact", {
    errors: [],
    oldInput: { name: "", email: "", message: "" },
    success: false,
  });
});

router.post(
  "/contact",
  [
    body("name").trim().notEmpty().withMessage("Name is required."),
    body("email").isEmail().withMessage("Please enter a valid email."),
    body("message").trim().notEmpty().withMessage("Message cannot be empty."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { name, email, message } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).render("contact", {
        errors: errors.array(),
        oldInput: { name, email, message },
      });
    }

    // SETUP transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mehulpathak48@gmail.com',
        pass: 'nmqh vlrl bcse yrhq' // use environment vars for production
      }
    });

    const mailOptions = {
      from: email,
      to: 'gamingsm43@gmail.com',
      subject: `New Message from ${name}`,
      text: `Email: ${email}\n\nMessage:\n${message}`
    };

    try {
      await transporter.sendMail(mailOptions);
      res.render("contact", {
        success: "Message sent successfully!",
        errors: [],
        oldInput: { name: "", email: "", message: "" },
      });
    } catch (error) {
      console.error(error);
      res.render("contact", {
        errors: [{ msg: "Error sending message. Please try again." }],
        oldInput: { name, email, message },
      });
    }
  }
);

module.exports = router;

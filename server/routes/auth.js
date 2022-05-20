require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const { User, validate } = require("../models/user");
const Setup = require("../models/Setup");
const Session = require("../models/Session");
const { authenticate } = require("./middleware/authenticate");
const { authorize } = require("./middleware/authorize");

const router = express.Router();

router.post(
  "/register",
  authenticate,
  authorize("admin", "leadgen.permissions.AddUser"),
  async (req, res) => {
    //When uncommented, email needs to be unique.
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists)
      return res.status(403).json({ message: "This email already exists." });

    //When uncommented, username needs to be unique.
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists)
      return res.status(403).json({ message: "This username already exists." });

    // const { error } = validate(req.body);
    // if (error)
    //   return res.status(403).json({ message: error.details[0].message });

    try {
      const newUser = User({
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: "setupPassword",
      });

      const uploadedUser = await newUser.save();

      const setupToken = await Setup({ user: uploadedUser._id }).save();

      sendVerifyEmail(
        req,
        "http://localhost:3000/setup/" + setupToken.setupToken
      );

      return res.status(200).json(uploadedUser);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(401)
        .json({ message: "These credentials are not valid." });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res
        .status(401)
        .json({ message: "These credentials are not valid." });

    //When uncommented, the account needs to be verified(by email) before being able to login.
    const setupAccount = await Setup.findOne({ user: user._id });
    if (setupAccount)
      return res
        .status(401)
        .json({ message: "Your account has not yet been settedUp." });

    await Session.findOneAndDelete({ user: user._id });

    const sessionToken = crypto.randomBytes(50).toString("hex");

    await new Session({
      user: user._id,
      sessionToken: sessionToken,
    }).save();
    //TODO: implement 2fa
    res.cookie("session", sessionToken, {
      sameSite: process.env.ENVIRONMENT === "production" ? "lax" : "lax",
      //secure: process.env.ENVIRONMENT === "production",
      path: "/",
      expires: new Date(new Date().getTime() + 24 * 60 * 60000),
      httpOnly: true,
    });

    // res.cookie("isAuth", true, {
    //   sameSite: process.env.ENVIRONMENT === "production" ? "lax" : "lax",
    //   //secure: process.env.ENVIRONMENT === "production",
    //   path: "/",
    //   expires: new Date(new Date().getTime() + 24 * 60 * 60000),
    //   httpOnly: false,
    // });

    return res
      .status(200)
      .json({
        message: "Session cookie has been set.",
        username: user.username,
        fullname: user.fullname,
        role: user.role,
      })
      .send();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/logout", async (req, res) => {
  const cookie = req.cookies.session;

  res.clearCookie("session");
  //res.clearCookie("isAuth");

  try {
    await Session.findOneAndDelete({ sessionToken: cookie });
  } catch (err) {
    console.log(err.message);
  }

  return res.status(200).json({ message: "You have successfully logged out" });
});

function sendVerifyEmail(req, link) {
  //Production version
  //   let transporter = nodemailer.createTransport({
  //     host: "smtp.ethereal.email",
  //     port: 587,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: testAccount.user, // generated ethereal user
  //       pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  //     },
  //   });
  //   let info = await transporter.sendMail({
  //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
  //     to: "bar@example.com, baz@example.com", // list of receivers
  //     subject: "Hello ✔", // Subject line
  //     text: "Hello world?", // plain text body
  //     html: "<b>Hello world?</b>", // html body
  //   });

  //Development version
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "canonprinterdejong@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "semdejo2003@gmail.com",
    to: req.body.email,
    subject: "One more step!",
    text: "Click this link to verify and use your account " + link,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = router;

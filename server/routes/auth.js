const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/user");
const { sendEmailToUser } = require("./util/sendemail");

//@route    POST auth/signin
//@desc     sigin routes
//@access   Public

router.post(
  "/signin",
  [
    check("email", "Please enter a valid email address").isEmail(),
    check("password", "Please enter password")
      .not()
      .isEmpty()
      .isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User does not exists" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Wrong Password" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 60 * 60 * 24 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

//@route    POST auth/register
//@desc     registration route
//@access   Public

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty().isLength({ min: 5 }),
    check("email", "Enter a valid email address").isEmail(),

  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email } = req.body;
    const password = Math.floor(10000000 + Math.random() * 10000000).toString();
    console.log({ password })
    sendEmailToUser(res, password, email);
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      user = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      ///will generate a token
      // sendEmailToUser(res, "I am a token");
      ///will generate a token
      res.json({ msg: 'Please Check Password in your email' });
    } catch (error) {
      console.log(error.message)
      res.status(500).send("Server Error");
    }
  }
);

//@route    POST auth/user
//@desc     getting authenticated user profile
//@access   Private
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.status(400).json({ error: [{ msg: "User deos not exists" }] });
    }
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});


//@route    POST auth/sendpasswordresetlink
//@desc     sending the password reset link to user email address
//@access   Public
router.post("/sendpasswordresetlink", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.find({ email: email.toLowerCase() }).select("_id");
    if (user.length === 0)
      return res
        .status(400)
        .json({ errors: [{ msg: "user does not exists" }] });

    await token.save();
    sendEmailToUser(res, "token.token", email);
  } catch (error) {
    console.log("Serever Error");
    res.status(500).send("Server Error");
  }
});


module.exports = router;
